import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = 
        {
            id: this.props.match.params.id,
            patientName: '',
            doctorName: '',
            disease: '',
            roomNo: '',
            img: ''
        }
        this.changePatientNameHandler = this.changePatientNameHandler.bind(this);
        this.changeDoctorNameHandler = this.changeDoctorNameHandler.bind(this);
        this.changeDiseaseHandler = this.changeDiseaseHandler.bind(this);
        this.changeRoomNoHandler = this.changeRoomNoHandler.bind(this);
        this.changeImgHandler = this.changeImgHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount()
    {
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>
        {
            let employee = res.data;
            this.setState({
                    patientName: employee.patientName,
                    doctorName: employee.doctorName,
                    disease : employee.disease,
                    roomNo:employee.roomNo,
                    img : employee.img
            });
        });
    }

    updateEmployee = (e) => 
    {
        e.preventDefault();
        let employee = {patientName: this.state.patientName, doctorName: this.state.doctorName, disease: this.state.disease,roomNo: this.state.roomNo, img: this.state.img};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(employee, this.state.id).then( res => 
        {
            this.props.history.push('/employees');
        });
    }
    
   
    changePatientNameHandler= (event) => 
    {
        this.setState({patientName: event.target.value});
    }

    changeDoctorNameHandler= (event) => 
    {
        this.setState({doctorName: event.target.value});
    }

    changeDiseaseHandler= (event) => 
    {
        this.setState({disease: event.target.value});
    }
    changeRoomNoHandler= (event) => 
    {
        this.setState({roomNo: event.target.value});
    }
    changeImgHandler= (event) => 
    {
        this.setState({img: event.target.value});
    }


    cancel()
    {
        this.props.history.push('/employees');
    }

    render() 
    {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Patient Name</label>
                                            <input placeholder="Patient Name" name="patientName" className="form-control" 
                                                value={this.state.patientName} onChange={this.changePatientNameHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Doctor Name </label>
                                            <input placeholder="Doctor Name" name="doctorName" className="form-control" 
                                                value={this.state.doctorName} onChange={this.changeDoctorNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Disease </label>
                                            <input placeholder="disease" name="disease" className="form-control" 
                                                value={this.state.disease} onChange={this.changeDiseaseHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Room NO </label>
                                            <input placeholder="Room No" name="roomNo" className="form-control" 
                                                value={this.state.roomNo} onChange={this.changeRoomNoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Img Url: </label>
                                            <input placeholder="Img Url" name="img" className="form-control" 
                                                value={this.state.img} onChange={this.changeImgHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent
