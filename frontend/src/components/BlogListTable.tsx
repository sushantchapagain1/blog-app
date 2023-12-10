import BlogListsTableCard from './BlogListsTableCard';

import { AxiosError } from 'axios';
import moment from 'moment';
import Loading from './Loader';
import ErrorStyle from './ErrorStyle';
import { useCurrentUserBlog } from '../hooks/blogs/useCurrentUserBlog';

const headings = [
  { name: 'title' },
  { name: 'description' },
  { name: 'createdAt' },
  { name: 'Action' },
  { name: 'Action' },
  { name: 'Action' },
];

const BlogListTable = () => {
  const { data, isError, error, isLoading } = useCurrentUserBlog();

  if (isLoading) {
    return <Loading />;
  }

  {
    if (
      isError &&
      error instanceof AxiosError &&
      error.message == 'Network Error'
    ) {
      return <ErrorStyle message={`Can't connect to the network`} />;
    }
  }

  if (isError && error && error?.response?.statusText) {
    return <ErrorStyle message={error?.response?.statusText} />;
  }

  return (
    <div>
      <h2 className="text-2xl font-medium mt-3">Your blogs list</h2>
      {data?.data?.length == 0 ? (
        <h1 className="mt-9 text-semibold">
          There are no blog list created by you.
        </h1>
      ) : (
        <div className="mt-6 w-fit">
          <table className="divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headings?.map((heading, i: number) => {
                  return (
                    <th
                      className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      key={i + 1}
                    >
                      {heading?.name}
                    </th>
                  );
                })}
              </tr>
            </thead>

            {data?.data?.map((blogList: any) => (
              <BlogListsTableCard
                key={blogList?.id}
                {...blogList}
                createdAt={moment(blogList.createdAt).format('YYYY-MM-DD')}
                state={blogList}
              />
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogListTable;
