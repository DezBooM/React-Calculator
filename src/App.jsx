import { useState, useEffect } from "react"
import { NumericFormat  } from "react-number-format"

function App() {

  const [input, setInput] = useState("")
  const [prevState, setPrevState] = useState("")
  const [currState, setCurrState] = useState("")
  const [total, setTotal] = useState(false)
  const [operator, setOperator] = useState(null)

  useEffect(() => {
    setInput(currState)
  }, [currState])

  useEffect(() => {
    setInput("0")
  }, [])

  const addNumbers = e => {
    if(currState.includes(".") && e.target.innerText === ".") return
    if(total) setPrevState("")
    currState ? setCurrState(prev => prev + e.target.innerText) : setCurrState(e.target.innerText)
    setTotal(false)
  }

  const equal = e => {
    if(e?.target.innerText === "=") setTotal(true)
    let cal
    switch(operator) {
      case "/":
        cal = String(parseFloat(prevState) / parseFloat(currState))
        break
      case "+":
        cal = String(parseFloat(prevState) + parseFloat(currState))
        break
      case "-":
        cal = String(parseFloat(prevState) - parseFloat(currState))
        break
      case "*":
        cal = String(parseFloat(prevState) * parseFloat(currState))
        break
      default:
        return
    }
    setInput("")
    setPrevState(cal)
    setCurrState("")
  }

  const operatorType = e => {
    setTotal(false)
    setOperator(e.target.innerText)
    if(currState === "") return
    if(prevState !== "") {
      equal()
    } else {
      setPrevState(currState)
      setCurrState("")
    }
  }

  const minusPlus = () => {
    if(currState.charAt(0) === "-") {
      setCurrState(currState.substring(1))
    } else setCurrState (`-${currState}`)
  }

  const percentage = () => {
    prevState ? setCurrState(String(parseFloat(currState) / 100 * prevState))
    : setCurrState(String(parseFloat(currState) / 100))
  }

  const deleteAllInput = () => {
    setCurrState("")
    setPrevState("")
    setTimeout(() => setInput("0"), [10])
  }

  return (
    <div className="flex justify-center items-center h-screen w-full bg-red-900">
      <div className="flex flex-col items-center text-2xl text-gray-200">
        <div className="overflow-hidden text-bold text-5xl flex justify-end border-2 border-gray-200 bg-black bg-opacity-80 gray-200 rounded-t-lg items-center w-80 px-7 h-20">
          {input !== "" || input === "0" ? 
          <NumericFormat 
            value={input}
            displayType={"text"}
            thousandSeparator={true} /> :
           <NumericFormat 
            value={prevState}
            displayType={"text"}
            thousandSeparator={true} /> 
          }
        </div>
          <div className="grid grid-cols-4">
            <div 
              className="bg-green-900 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={deleteAllInput}>AC</div>
            <div 
              className="bg-green-700 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={minusPlus}>+/-</div>
            <div 
              className="bg-green-700 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={percentage}>%</div>
            <div 
              className="bg-green-700 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={operatorType}>/</div>
            <div 
              className="bg-green-600 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={addNumbers}>7</div>
            <div 
              className="bg-green-600 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={addNumbers}>8</div>
            <div 
              className="bg-green-600 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={addNumbers}>9</div>
            <div 
              className="bg-green-700 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={operatorType}>*</div>
            <div 
              className="bg-green-600 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={addNumbers}>4</div>
            <div 
              className="bg-green-600 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={addNumbers}>5</div>
            <div 
              className="bg-green-600 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={addNumbers}>6</div>
            <div 
              className="bg-green-700 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={operatorType}>-</div>
            <div 
              className="bg-green-600 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={addNumbers}>1</div>
            <div 
              className="bg-green-600 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={addNumbers}>2</div>
            <div 
              className="bg-green-600 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={addNumbers}>3</div>
            <div 
              className="bg-green-700 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={operatorType}>+</div>
            <div 
              className="bg-green-600 cursor-pointer border-2 border-gray-200 gray-200 rounded-bl-lg flex justify-center items-center col-span-2 w-40 h-20"
              onClick={addNumbers}>0</div>
            <div 
              className="bg-green-700 cursor-pointer border-2 border-gray-200 gray-200 flex justify-center items-center w-20 h-20"
              onClick={addNumbers}>.</div>
            <div 
              className="bg-green-700 cursor-pointer border-2 border-gray-200 gray-200 rounded-br-lg flex justify-center items-center w-20 h-20"
              onClick={operatorType}>=</div>
          </div>
      </div>
    </div>
  )
}

export default App