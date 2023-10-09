function Card({ image, selected, onClick }) {
  const backImage = "./assets/ElephantLogo.png";

  return (
    <div className="card">
        <div className={selected && "selected"}>
            <img alt="" src={image} className="card-face" />

            <img alt="" src={backImage} className="card-back" onClick={onClick} />
        </div>
    </div>
  );
};

export default Card;
