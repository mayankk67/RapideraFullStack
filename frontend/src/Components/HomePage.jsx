import React from 'react';
import './HomePage.css'

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            number: '',
            nl: [],
            password: '',
            cpassword: '',
            validName: 0,
            validNumber: 0,
            validEmail: 0,
            validPassword: 0,
            validCpassword: 0,
            tnc: 0
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.feed = this.feed.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
    }
    handleButton(event) {
        if (this.state.tnc === 0)
            this.setState({ tnc: 1 });
        else this.setState({ tnc: 0 });
    }
    feed() {
        var { validCpassword, validEmail, validName, validNumber, validPassword } = this.state;
        if (validCpassword === 0 && validEmail === 0 && validName === 0 && validNumber === 0 && validPassword === 0)
            alert("Account created successfully");
    }
    async handleSubmit(event) {
        event.preventDefault();
        var { name, email, password, cpassword} = this.state;
        var lst1 = name.split('');
        if (lst1.indexOf(' ') === -1)
            this.setState({ validName: 1 });
        else this.setState({ validName: 0 });

        var lst2 = email.split('.');
        if (!(lst2[1] === 'com' || lst2[1] === 'org'))
            this.setState({ validEmail: 1 });
        else this.setState({ validEmail: 0 });

        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!regularExpression.test(password))
            this.setState({ validPassword: 1 });
        else this.setState({ validPassword: 0 });

        if (password !== cpassword)
            this.setState({ validCpassword: 1 });
        else this.setState({ validCpassword: 0 });

        const wait1 = 2000;
        await wait1;
        this.feed();
    }
    handleClick(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    deletePhone(item) {
        var lst = this.state.nl;
        var pos = lst.indexOf(item);
        lst.splice(pos, 1);
        this.setState({ nl: lst });
    }
    handlePhone() {
        var lst = this.state.nl;
        var { number } = this.state;
        if (number !== '') {
            if (number.length !== 10)
                this.setState({ validNumber: 1 });
            else this.setState({ validNumber: 0 });
            lst.push(number);
        }
        this.setState({ number: '', nl: lst });
    }
    render() {
        var { name, email, password, cpassword, number } = this.state;
        return (
            <div className="wrapper">
                <div className="faarm">
                    <h1>Registration Form</h1>
                </div>
                <div className="conte">
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group row">
                            <label htmlFor="name" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="name" value={name} onChange={this.handleClick}></input>
                                <br />
                                {
                                    (this.state.validName) ? <div class="alert alert-danger" role="alert">
                                        Please enter your complete name(with space).
                                  </div> : null
                                }
                            </div>
                        </div>
                        <div class="form-group row">
                            <label htmlFor="email" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" name="email" value={email} onChange={this.handleClick}></input>
                                <br />
                                {
                                    (this.state.validEmail) ? <div class="alert alert-danger" role="alert">
                                        Please enter your email with .com or .org.
                                  </div> : null
                                }
                            </div>
                        </div>
                        <div class="form-group row">
                            <label htmlFor="phone" class="col-sm-2 col-form-label">Phone</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control col-sm-10 hey" name="number" value={number} onChange={this.handleClick}></input>
                                <button type="button" onClick={this.handlePhone} class="hey btn btn-primary col-sm-2">+</button>
                                <br /><br/>
                                {
                                    (this.state.validNumber) ? <div class="alert alert-danger" role="alert">
                                        <p>Please enter a proper phone number</p>
                                    </div> : null
                                }
                                {
                                    this.state.nl.map((item, index) => {
                                        return <div><span key={index}>{item}</span>&nbsp;&nbsp;&nbsp;<button onClick={() => this.deletePhone(item)} type="button" class="btn btn-danger">-</button><br /></div>
                                    })
                                }
                                <br /><br />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label htmlFor="password" class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" name="password" value={password} onChange={this.handleClick}></input>
                                <br />
                                {
                                    (this.state.validPassword) ? <div class="alert alert-danger" role="alert">
                                        <p>Please enter 1 LowerCase alphabet</p>
                                        <p>Please enter 1 UpperCase alphabet</p>
                                        <p>Please enter 1 number</p>
                                        <p>Please enter 1 special character</p>
                                    </div> : null
                                }
                            </div>
                        </div>
                        <div class="form-group row">
                            <label htmlFor="cpassword" class="col-sm-2 col-form-label">Confirm Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" name="cpassword" value={cpassword} onChange={this.handleClick}></input>
                                <br />
                                {
                                    (this.state.validCpassword) ? <div class="alert alert-danger" role="alert">
                                        <p>Password do not match</p>
                                    </div> : null
                                }
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" onClick={this.handleButton}></input>
                            <span> I agree to the terms and conditions</span>
                        </div>
                        {
                            (this.state.tnc) ?
                                <div class="form-group row fbtn">
                                    <button type="submit" class="btn btn-primary btn-lg">Sign in</button>
                                </div> : null
                        }
                    </form>
                </div>
            </div>
        )
    }
}

export default HomePage;
