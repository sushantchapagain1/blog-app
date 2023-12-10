import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

import moment from 'moment';
import DOMPurify from 'dompurify';
import Loading from '../components/Loader';
import ErrorStyle from '../components/ErrorStyle';
import { useBlog } from '../hooks/blogs/useBlog';
import { useDeleteBlog } from '../hooks/blogs/useDeleteBlog';

const Blog = () => {
  const { user } = useAuth();
  const { data, isError, isLoading, error } = useBlog();
  const { removeBlog, isDeleting } = useDeleteBlog();

  function handleDelete() {
    removeBlog();
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorStyle
        message={error?.response.data.message || 'something went wrong '}
      />
    );
  }

  return (
    <div className="mt-9">
      <img
        src={data?.data?.image}
        alt="blog image"
        className="h-[350px] w-full object-cover "
      />
      <div className="user flex gap-3 my-9">
        <div className="user-img">
          <img
            src="/images/nouser.png" //static cz i have not implemented backend profile upload logic.
            alt=""
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="user-info">
          <span className="font-semibold">{data?.data?.author?.name}</span>
          <p className="">Posted {moment(data?.data?.createdAt).fromNow()}</p>
        </div>
        {user && user?.id === data?.data?.authorId && (
          <div className="actions flex gap-3">
            <Link
              to={`/create-blog?edit=${data?.data?.id}`}
              className="cursor-pointer"
              state={data?.data}
            >
              <img src="/images/edit.png" alt="" />
            </Link>
            <button onClick={handleDelete} disabled={isDeleting}>
              <img src="/images/delete.png" alt="" className="cursor-pointer" />
            </button>
          </div>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold capitalize">{data?.data?.title}</h2>
        <p
          className="mt-9"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.data?.content),
          }}
        ></p>
      </div>
    </div>
  );
};

export default Blog;
