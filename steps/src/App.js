import React, { useState } from "react";

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

function App() {
  return <Steps />;
}
export default App;

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  return (
    <div>
      <div className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </div>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button onClick={handlePrevious} btnBgColor="#7950f2" txtColor="white">
              <span>👈</span> Previous
            </Button>
            <Button onClick={handleNext} btnBgColor="#7950f2" txtColor="white">
              Next <span>👉</span>
              <span>🤓</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ children, step }) {
  return (
    <div className="message">
      <p>Step: {step}</p>
      {children}
    </div>
  );
}

function Button({ onClick, btnBgColor, txtColor, children }) {
  return (
    <button style={{ backgroundColor: btnBgColor, color: txtColor }} onClick={onClick}>
      {children}
    </button>
  );
}
