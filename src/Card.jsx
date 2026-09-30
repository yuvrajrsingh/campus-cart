const Card = (props) => {
  return (
    <div>
      <img src={props.image} width="300px" alt={props.name} />
      <h3>{props.name}</h3>
      <p>${props.price}</p>
      <p>{props.category}</p>
    </div>
  );
};

export default Card;
