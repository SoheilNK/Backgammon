// const clr: Text = ""
function App() {
  return (
    <Checker />
  )
}

export default App
let imgUrl = ""
let clr = ""

function Checker() {
  if (true) {
    imgUrl = "Checker-W.jpg";
  }
  
  return (
    <div>
      <img src={imgUrl} />
    </div>
  );
}
