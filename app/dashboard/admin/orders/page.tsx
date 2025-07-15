import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MongoClient, ObjectId } from "mongodb";

type Purchase = {
  _id: ObjectId;
  email: string;
  courseId?: string;
  sessionId?: string;
  createdAt?: Date;
};

type Course = {
  _id: ObjectId;
  title: string;
};

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/dashboard");

  const client = await new MongoClient(process.env.MONGODB_URI!).connect();
  const db = client.db("test");

  // fetch purchases
  const purchases = (await db.collection("purchases").find().toArray()) as Purchase[];

  // extract courseIds from purchases (filter out undefined)
  const courseIds = purchases
    .map((p) => p.courseId)
    .filter((id): id is string => Boolean(id))
    .map((id) => new ObjectId(id));

  // fetch course data
  const courses = (await db
    .collection("courses")
    .find({ _id: { $in: courseIds } })
    .toArray()) as Course[];

  const courseMap = new Map(courses.map((c) => [c._id.toString(), c.title]));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">All Purchases</h1>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto border rounded-md shadow-sm">
        <table className="min-w-full text-sm sm:text-base border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border p-2 text-left">#</th>
              <th className="border p-2 text-left">User Email</th>
              <th className="border p-2 text-left">Course</th>
              <th className="border p-2 text-left hidden sm:table-cell">Session ID</th>
              <th className="border p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, i) => (
              <tr key={purchase._id.toString()} className="hover:bg-gray-50">
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2 break-all">{purchase.email}</td>
                <td className="border p-2">
                  {purchase.courseId
                    ? courseMap.get(purchase.courseId) || "Unknown Course"
                    : "N/A"}
                </td>
                <td className="border p-2 break-all hidden sm:table-cell">
                  {purchase.sessionId || "—"}
                </td>
                <td className="border p-2 whitespace-nowrap">
                  {purchase.createdAt
                    ? new Date(purchase.createdAt).toLocaleDateString()
                    : purchase._id.getTimestamp().toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
