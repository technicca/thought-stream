import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
export default function PostFeed({ posts, admin }) {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  return (
    <div className="card">
   

      <Link href={`/${post.username}/${post.slug}`}>
      <h2>{post?.title} <span className="text-sm">[
        {createdAt.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })}]
      </span></h2>
      </Link>
      
        <span>
          <ReactMarkdown>{post?.content}</ReactMarkdown>
        </span>
           {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
        </>
      )}
    </div>
  );
}
