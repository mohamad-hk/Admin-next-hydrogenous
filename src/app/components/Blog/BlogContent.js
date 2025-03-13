const BlogContent = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default BlogContent;
