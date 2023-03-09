function FavoriteColor() {
    const [color, setColor] = useState("red");
  
    return (
      <>
        <h1>My favorite color is {color}!</h1>
        <button
          type="button"
          onClick={() => setDisplay("blue")}
        >Blue</button>
      </>
    )
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<FavoriteColor />);