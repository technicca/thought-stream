import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function PostContent({ post }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  return (
    <div className="card">
      <h2>{post?.title} <span className="text-sm">[
        {createdAt.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })}]
      </span></h2>
      
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
