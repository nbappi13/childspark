import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MongoClient, ObjectId } from "mongodb";

// define a lightweight User type for listing
type User = {
  _id: ObjectId;
  name?: string;
  email: string;
  role?: string;
  createdAt?: string;
};

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  // protect route: only admin can access
  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/dashboard");

  // connect to MongoDB and get users
  const client = await new MongoClient(process.env.MONGODB_URI!).connect();
  const db = client.db("test");
  const users = (await db.collection("users").find().toArray()) as User[];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">All Users</h1>

      {/* responsive wrapper */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id.toString()} className="hover:bg-gray-50">
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2">{user.name || "—"}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2 capitalize">{user.role || "user"}</td>
                <td className="border p-2">
                  {new Date(user.createdAt || user._id.getTimestamp()).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
