import "./Auth.css";
const User = () => {
  const user = localStorage.getItem("user");
  const data = JSON.parse(user)
  console.log(data);
  return (
    <div className="user-info" >

      <img src={data.avatar}  alt="avatar" />
      <span> {data.username} </span>
      <span>{data.email}</span>

      <button
        className="search-button"
        onClick={() => {
          if (window.confirm("Are you sure you want to log out?")) {
            {
              localStorage.removeItem("user");
              window.location.href = "/";
            }
          }
        }}
      >
      Çıkış yap
      </button>
    </div>
  );
};

export default User;
