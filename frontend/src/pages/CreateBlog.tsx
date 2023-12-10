import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useCategory } from '../hooks/category/useCategory';
import { useCreateBlog } from '../hooks/blogs/useCreateBlog';

import { BlogFormData } from '../hooks/blogs/useCreateBlog';
import { useUpdateBlog } from '../hooks/blogs/useUpdateBlog';
import { convertToBase64 } from '../utils/convertImage';

const CreateBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { categories } = useCategory();
  const dataState = useLocation()?.state;
  const { createBlog, error, isError, isCreating, isSuccess } = useCreateBlog();
  const { updateBlog, isEditSuccess, isEditing } = useUpdateBlog();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  });

  const [value, setValue] = useState(dataState?.content);
  const [selectedCategory, setSelectedCategory] = useState(
    dataState?.categoryId
  );
  const [title, setTitle] = useState(dataState?.title);
  const [file, setFile] = useState<File | null>(dataState?.image || null);
  const [err, setErr] = useState('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.length < 20) {
      setErr('Content should be at least 20 characters');
      return;
    } else {
      setErr('');
    }

    const base64 = (await convertToBase64(file as File)) as string;

    let data: BlogFormData = {
      title,
      content: value,
      image: base64,
      authorId: user?.id,
      categoryId: selectedCategory,
    };

    if (dataState) {
      data = {
        ...data,
        id: dataState?.id,
      };
    }

    dataState
      ? updateBlog({ updateData: { ...data }, id: dataState?.id })
      : createBlog(data, {
          onSuccess: () => {
            setErr('');
            setTitle('');
            setSelectedCategory('');
            setFile(null);
            setValue('');
          },
        });
  };

  if (isCreating || isEditing) {
    return <Loader />;
  }

  return (
    <>
      {isError && (
        <p className="text-sm text-red-500">
          {error?.response?.data?.err?.message || 'something went wrong'}
        </p>
      )}
      {isSuccess && (
        <p className="text-sm text-green-500"> {'Blog Created Succesfully'}</p>
      )}

      {isEditSuccess && (
        <p className="text-sm text-green-500"> {'Blog Updated Succesfully'}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-7 mt-9 gap-5">
          <div className="col-span-5">
            <div>
              <input
                type="text"
                placeholder="Title"
                className="border p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div className="h-80 mt-3 border-b bg-white">
                <ReactQuill
                  className="overflow-scroll h-full w-full"
                  theme="snow"
                  value={value}
                  onChange={setValue}
                />
              </div>
              {err && <p className="text-sm text-red-500"> {err}</p>}
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-6 border p-3">
            <div>
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files && e.target.files[0])}
                required
              />
              <p className="text-[11px]">File max size 10kb</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Select a category</h3>
              {categories?.map((link: any, i: number) => {
                return (
                  <div key={i + 1} className="flex gap-3">
                    <input
                      type="radio"
                      name="category"
                      id={link.id}
                      value={link.id}
                      checked={selectedCategory === link.id}
                      onChange={handleCategoryChange}
                      required
                    />
                    <label htmlFor={link.id}>{link.name}</label>
                  </div>
                );
              })}
            </div>
            <button
              type="submit"
              className="self-start border border-teal-500 text-teal-500 hover:bg-teal-600 hover:text-white transition-all p-2 font-medium"
            >
              Publish
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
