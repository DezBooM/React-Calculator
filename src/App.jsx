import { useState, useEffect } from "react"
import { NumericFormat  } from "react-number-format"

function App() {

  const [input, setInput] = useState("")
  const [prevState, setPrevState] = useState("")
  const [currState, setCurrState] = useState("")
  const [total, setTotal] = useState(false)
  const [operator, setOperator] = useState(null)
  const [theme, setTheme] = useState(() => JSON.parse(localStorage.getItem("themes")) || {
    background: "bg-red-900",
    text: "text-gray-200",
    input: "text-gray-200",
    border: "border-gray-200",
    ac: "bg-green-800",
    operator: "bg-green-700",
    number:"bg-green-600"
  })

  const changeTheme = e => {
    switch(e.target.id) {
      case "dark":
        setTheme({
          background: "bg-gray-900",
          text: "text-gray-200",
          input: "text-gray-200",
          border: "border-gray-200",
          ac: "bg-gray-800",
          operator: "bg-gray-700",
          number:"bg-gray-600"
        })
      break
      case "blue":
        setTheme({
          background: "bg-blue-900",
          text: "text-gray-200",
          input: "text-gray-200",
          border: "border-gray-200",
          ac: "bg-blue-800",
          operator: "bg-blue-700",
          number:"bg-blue-600"
        })
      break
      case "yellow":
        setTheme({
          background: "bg-yellow-900",
          text: "text-black",
          input: "text-gray-200",
          border: "border-black",
          ac: "bg-yellow-800",
          operator: "bg-yellow-700",
          number:"bg-yellow-600"
        })
      break
      case "light":
        setTheme({
          background: "bg-sky-300",
          text: "text-gray-900",
          input: "text-gray-200",
          border: "border-gray-900",
          ac: "bg-teal-300",
          operator: "bg-green-300",
          number:"bg-emerald-300"
        })
      break
      default: setTheme({
        background: "bg-red-900",
        text: "text-gray-200",
        input: "text-gray-200",
        border: "border-gray-200",
        ac: "bg-green-900",
        operator: "bg-green-700",
        number:"bg-green-600"
      })
    }
  }

  useEffect(() => {
    setInput(currState)
  }, [currState])

  useEffect(() => {
    setInput("0")
  }, [])

  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(theme))
  }, [theme])

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
    <div className={`font-ibm select-none flex justify-center items-center h-screen w-full ${theme.background}`}>
      <div className={`flex flex-col items-center text-2xl ${theme.text}`}>
        <div className={`overflow-hidden text-bold text-4xl flex justify-end border-2 ${theme.border}  bg-black ${theme.input} opacity-80 rounded-t-lg items-center w-80 px-6 h-20`}>
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
              className={`${theme.ac} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={deleteAllInput}>AC</div>
            <div 
              className={`${theme.operator} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={minusPlus}>+/-</div>
            <div 
              className={`${theme.operator} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={percentage}>%</div>
            <div 
              className={`${theme.operator} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={operatorType}>/</div>
            <div 
              className={`${theme.number} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={addNumbers}>7</div>
            <div 
              className={`${theme.number} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={addNumbers}>8</div>
            <div 
              className={`${theme.number} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={addNumbers}>9</div>
            <div 
              className={`${theme.operator} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={operatorType}>*</div>
            <div 
              className={`${theme.number} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={addNumbers}>4</div>
            <div 
              className={`${theme.number} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={addNumbers}>5</div>
            <div 
              className={`${theme.number} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={addNumbers}>6</div>
            <div 
              className={`${theme.operator} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={operatorType}>-</div>
            <div 
              className={`${theme.number} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={addNumbers}>1</div>
            <div 
              className={`${theme.number} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={addNumbers}>2</div>
            <div 
              className={`${theme.number} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={addNumbers}>3</div>
            <div 
              className={`${theme.operator} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={operatorType}>+</div>
            <div 
              className={`${theme.number} cursor-pointer border-2 ${theme.border} gray-200 rounded-bl-lg flex justify-center items-center col-span-2 w-40 h-20`}
              onClick={addNumbers}>0</div>
            <div 
              className={`${theme.operator} cursor-pointer border-2 ${theme.border} gray-200 flex justify-center items-center w-20 h-20`}
              onClick={addNumbers}>.</div>
            <div 
              className={`${theme.operator} cursor-pointer border-2 ${theme.border} gray-200 rounded-br-lg flex justify-center items-center w-20 h-20`}
              onClick={operatorType}>=</div>
          </div>
        <div className="flex justify-evenly w-80 mt-2">
          <button 
            onClick={changeTheme} 
            className={`h-10 w-10 bg-gradient-to-b from-green-600 to-red-900 border ${theme.border} rounded-full`}
            id="default" />
          <button 
            onClick={changeTheme} 
            className={`h-10 w-10 bg-gradient-to-b from-gray-600 to-gray-800 border ${theme.border} rounded-full`}
            id="dark" />
          <button 
            onClick={changeTheme} 
            className={`h-10 w-10 bg-gradient-to-b from-blue-600 to-blue-900 border ${theme.border} rounded-full`}
            id="blue" />
          <button 
            onClick={changeTheme} 
            className={`h-10 w-10 bg-gradient-to-b from-yellow-600 to-black border ${theme.border} rounded-full`}
            id="yellow" />
          <button 
            onClick={changeTheme} 
            className={`h-10 w-10 bg-gradient-to-b from-green-300 via-sky-300 to-emerald-300 border ${theme.border} rounded-full`}
            id="light" />
        </div>
      </div>
    </div>
  )
}

export default App