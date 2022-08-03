import React from 'react';
import PageTitle from './Shared/PageTitle';

const Blogs = () => {
    return (
        <div className='mt-20 px-4 md:px-20'>
            <PageTitle title='Blogs' />
            <h2 className='text-2xl text-center mb-10'>Blogs</h2>
            <div className='flex flex-col gap-5'>
                <div>
                    <p className='font-semibold'>Q1. How will you improve the performance of a React Application?</p>
                    <p >Ans: Actually React directlly not change Actual DOM. don't re-render when no need.work with list virtualization.another best thing is, our all image load before useing app,and need to use.when we have parent component with childComponent,as a result parent component render.also with childComponent.so we need to render childComponent when nedded,for using component state local.</p>
                </div>
                <div>
                    <p className='font-semibold'>Q2. What are the different ways to manage a state in a React application?</p>
                    <p >Ans: If want to manage a state 4 defferent ways.local state:when using we manage data self component,or another component.Global state:when need to access data multiple components,in react <span className='font-bold'>useContext</span>.Server state:When try to use any external data,useing server state,in react using <span className='font-bold'>react-query</span>.Url state:using url state to get url location,In react using <span className='font-bold'>react-router-dom.</span> </p>
                </div>
                <div>
                    <p className='font-semibold'>Q3. How does prototypical inheritance work?</p>
                    <p >Ans: Prototypical inheritance let us to reprocess the properties or methods from one JavaScript object.When it approach to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype.A prototype is an early sample, model, or release of a product built to test a concept or process. It is a term used in a variety of contexts, including semantics, design, electronics, and software programming.  </p>
                </div>
                <div>
                    <p className='font-semibold'>Q4.  Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts?</p>
                    <p >Ans: useState return tow value,first is state value, seccond is set new state value. when use useState([]) means initial value of state. when we want to change value of state.we need to call set state function. set new state value to use setProducts name. products is plural,means get more then one element, so initial value is []. when products api is true,using setProducts to set products.</p>
                </div>
                <div>
                    <p className='font-semibold'>Q5. What is a unit test? Why should write unit tests?</p>
                    <p >Ans: unit test is part of software testing. Unit mean specific area of app, or components os software are tested.Unit Testing is main because software developers sometimes try saving time doing minimal unit testing and this is myth since unfitting unit testing leads to high cost Defect fixing through System Testing, Sociology Testing and even Beta Testing succeeding application is construct.</p>
                </div>
            </div>

        </div>
    );
};

export default Blogs;