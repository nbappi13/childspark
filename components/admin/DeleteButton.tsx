// components/admin/DeleteButton.tsx
"use client"

type Props = {
  courseId: string
}

export default function DeleteButton({ courseId }: Props) {
  return (
    <form
      action={`/dashboard/admin/courses/delete`}
      method="POST"
      className="inline"
      onSubmit={(e) => {
        if (!confirm("Are you sure to delete this course?")) {
          e.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={courseId} />
      <button type="submit" className="text-red-600 hover:underline">
        Delete
      </button>
    </form>
  )
}
