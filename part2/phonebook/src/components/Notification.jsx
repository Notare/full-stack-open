const Notification = ({ message }) => {
  const success = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const error = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) return null;

  return (
    <div style={message.type === "success" ? success : error}>
      {message.text}
    </div>
  );
};

export default Notification;
