import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useDeleteCurrentUserBlog } from '../hooks/blogs/useDeleteCurrentUserBlog';

type PropsType = {
  title: string;
  content: string;
  createdAt: string;
  id: string;
  state: {
    data: {
      id: string;
      title: string;
      content: string;
      image: string;
      category: string;
    };
  };
};

const BlogListsTableCard: React.FC<PropsType> = ({
  title,
  content,
  createdAt,
  id,
  state,
}) => {
  const { isDeleting, removeBlogOfCurrentUser } = useDeleteCurrentUserBlog();

  function handleDelete() {
    removeBlogOfCurrentUser({ id: id });
  }

  return (
    <tbody className="bg-white divide-y divide-gray-200 text-sm font-medium">
      <tr>
        <td className="p-3">{title?.substring(0, 63)}</td>
        <td className="p-3">
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content.substring(0, 50)),
            }}
          ></p>
        </td>
        <td className="p-3">{createdAt}</td>
        <td className="p-3">
          <Link to={`/create-blog?edit=${id}`} state={state}>
            <img src="/images/edit.png" alt="edit btn" />
          </Link>
        </td>
        <td className="p-3">
          <Link to={`/blog/${id}`}>
            <img
              src="/images/icon-eye.png"
              className="rounded-full h-12 w-12"
            />
          </Link>
        </td>
        <td className="p-3">
          <button onClick={handleDelete} disabled={isDeleting}>
            <img src="/images/delete.png" alt="del btn" />
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default BlogListsTableCard;
