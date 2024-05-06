import MarathonPosts from "../modules/marathon/MarathonPosts";

const Posts = ({ setFirst }) => {
  return (
    <div>
      <MarathonPosts setFirst={setFirst} />
    </div>
  );
};

export default Posts;
