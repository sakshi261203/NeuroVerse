import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import "./Dyscalculia.css";  
import { Link } from "react-router-dom";
const Dyscalculia = () => {
  const [number, setNumber] = useState("");
  const [interpretation, setInterpretation] = useState(null);
  const [mathInput, setMathInput] = useState("");
  const [mathSteps, setMathSteps] = useState([]);
  const [chartType, setChartType] = useState("Bar");
  const [chartData, setChartData] = useState([]);
  const [chartInterpretation, setChartInterpretation] = useState("");

  useEffect(() => {
    generateChartData();
  }, []);

  const generateChartData = () => {
    const data = Array.from({ length: 5 }, (_, i) => ({
      name: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 100),
    }));
    setChartData(data);
    interpretChartData(data);
  };

  const interpretChartData = (data) => {
    const highest = Math.max(...data.map((d) => d.value));
    const lowest = Math.min(...data.map((d) => d.value));
    setChartInterpretation(`This dataset shows varying values. The highest value is ${highest}, while the lowest is ${lowest}.`);
  };

  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const interpretNumber = () => {
    if (!number) return;
    const num = parseInt(number);

    setInterpretation({
      evenOdd: num % 2 === 0 ? "Even" : "Odd",
      primeComposite: isPrime(num) ? "Prime" : "Composite",
      divisibleBy5: num % 5 === 0 ? "Divisible by 5" : "Not Divisible by 5",
    });
  };

  const evaluateExpression = (expr) => {
    try {
      const sanitizedExpr = expr.replace(/[^-()\d/*+.]/g, ""); 
      const result = eval(sanitizedExpr); 
      return isNaN(result) ? "Invalid Input" : result;
    } catch {
      return "Invalid mathematical expression";
    }
  };

  const breakDownMath = () => {
    if (!mathInput) return;
    const result = evaluateExpression(mathInput);
    if (result === "Invalid mathematical expression" || result === "Invalid Input") {
      setMathSteps([{ step: "Error", description: "Invalid mathematical expression. Please try again." }]);
      return;
    }

    const steps = [
      { step: "Start", description: `Expression: ${mathInput}` },
      { step: "→", description: "Performing Calculation..." },
      { step: "Calculation", description: `Result: ${result}` },
      { step: "→", description: "Finalizing Answer..." },
      { step: "End", description: "Final Answer Computed Successfully!" },
    ];
    setMathSteps(steps);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFE"];

  return (
     
    <div className="dyscalculia-page">
      
      <div className="main-content">
      <motion.h1 className="title2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        🧠 Dyscalculia Support Tools
      </motion.h1>
      <motion.div whileHover={{ scale: 1.05 }}>
        <h2>📊 Number Interpretation</h2>
        <input className='step-inp' type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Enter a number" />
        <button className='step-but' onClick={interpretNumber}>Interpret</button>
        
        {interpretation && (
          <motion.div className="interpretation-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.div className="interpretation-box even-odd" whileHover={{ scale: 1.1 }}>
              <h3>{interpretation.evenOdd}</h3>
            </motion.div>
            <motion.div className="interpretation-box prime-composite" whileHover={{ scale: 1.1 }}>
              <h3>{interpretation.primeComposite}</h3>
            </motion.div>
            <motion.div className="interpretation-box divisible-by-5" whileHover={{ scale: 1.1 }}>
              <h3>{interpretation.divisibleBy5}</h3>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <h2>🔗 Step-by-Step Math Breakdown (Flowchart)</h2>
        <input className='step-inp' type="text" value={mathInput} onChange={(e) => setMathInput(e.target.value)} placeholder="Enter a math expression" />
        <button className='step-but' onClick={breakDownMath}>Generate Flowchart</button>
        <div className="flowchart-container">
          {mathSteps.map((step, index) => (
            <motion.div key={index} className="flowchart-step" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.3 }}>
              <span className="step-label">{step.step}</span>
              <p className="step-p">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <h2>📈 Graphical Interpretation</h2>
        <select className="chart-selector" value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="Bar">Bar Chart</option>
          <option value="Pie">Pie Chart</option>
          <option value="Line">Line Chart</option>
        </select>

        <div className="chart-container">
          {chartType === "Bar" && <ResponsiveContainer width="100%" height={300}><BarChart data={chartData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#8884d8" /></BarChart></ResponsiveContainer>}
          {chartType === "Pie" && <ResponsiveContainer width="100%" height={300}><PieChart><Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>{chartData.map((_, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}</Pie></PieChart></ResponsiveContainer>}
          {chartType === "Line" && <ResponsiveContainer width="100%" height={300}><LineChart data={chartData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke="#82ca9d" /></LineChart></ResponsiveContainer>}
        </div>

        <p className="chart-interpretation">{chartInterpretation}</p>
      </motion.div>
      </div>
    </div>
  );
};
export default Dyscalculia;








 