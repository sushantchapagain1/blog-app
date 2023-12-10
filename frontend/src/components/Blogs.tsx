import { Link } from 'react-router-dom';

import { AxiosError } from 'axios';
import DOMPurify from 'dompurify';
import Loading from './Loader';
import { useBlogs } from '../hooks/blogs/useBlogs';

const Blogs = () => {
  const { data, isError, isLoading, error } = useBlogs();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    <div>
      {isError &&
        error instanceof AxiosError &&
        (error.message == 'Network Error'
          ? "Can't connect to the network"
          : error.response?.data?.message)}
    </div>;
  }

  return (
    <div className="mt-12 flex gap-36 flex-col p-3">
      {data?.data?.length === 0 ? (
        <h1 className="text-3xl font-bold">No data found</h1>
      ) : (
        data?.data?.map((post: any, index: number) => {
          const isEven = index % 2 === 0;
          return (
            <div className="grid grid-cols-5 gap-24" key={post.id}>
              {isEven ? (
                <>
                  <div className="col-span-3 flex flex-col gap-9 even:row-span-1">
                    <Link to={`/blog/${post.id}`}>
                      <h1 className="text-5xl font-semibold">{post.title}</h1>
                    </Link>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          post?.content.substring(0, 300)
                        ),
                      }}
                    ></p>
                    <Link
                      to={`/blog/${post.id}`}
                      className="self-start text-[teal] transition-all border border-[teal] p-3 font-medium hover:bg-[teal] hover:text-white"
                    >
                      Read More
                    </Link>
                  </div>
                  <div className="col-span-2 even:row-span-2 relative after:content-[''] after:w-full after:h-full after:bg-light-green after:absolute after:top-5 after:left-[-20px] after:z-[-1]">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-2 even:row-span-2 relative after:content-[''] after:w-full after:h-full after:bg-light-green after:absolute after:top-5 after:left-[-20px] after:z-[-1]">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="col-span-3 flex flex-col gap-9 even:row-span-1">
                    <Link className="link" to={`/blog/${post.id}`}>
                      <h1 className="text-5xl font-semibold">{post.title}</h1>
                    </Link>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          post?.content.substring(0, 300)
                        ),
                      }}
                    ></p>
                    <Link
                      to={`/blog/${post.id}`}
                      className="self-start text-[teal] transition-all border border-[teal] p-3 font-medium hover:bg-[teal] hover:text-white"
                    >
                      Read more
                    </Link>
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Blogs;
