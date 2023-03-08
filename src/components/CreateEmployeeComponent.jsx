import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { BsCheckCircleFill,BsFillXCircleFill } from "react-icons/bs";


class CreateEmployeeComponent extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = 
        {
            // step 2
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
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount()
    {

        // step 4
        if(this.state.id === '_add')
        {
            return
        }
        else
        {
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>
            {
                let employee = res.data;
                this.setState(
                {
                    patientName: employee.patientName,
                    doctorName: employee.doctorName,
                    disease : employee.disease,
                    roomNo:employee.roomNo,
                    img : employee.img
                });
            });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        }        
    }
    saveOrUpdateEmployee = (e) => 
    {
        e.preventDefault();
        let employee = {patientName: this.state.patientName, doctorName: this.state.doctorName,disease:this.state.disease, roomNo: this.state.roomNo, img: this.state.img};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add')
        {
            EmployeeService.createEmployee(employee).then(res =>
            {
                this.props.history.push('/employees');
            });
        }
        else
        {
            EmployeeService.updateEmployee(employee, this.state.id).then( res => 
            {
                this.props.history.push('/employees');
            });
        }
    }
    
    changePatientNameHandler= (event) => {
        this.setState({patientName: event.target.value});
    }

    changeDoctorNameHandler= (event) => {
        this.setState({doctorName: event.target.value});
    }

    changeDiseaseHandler= (event) => {
        this.setState({disease: event.target.value});
    }
    changeRoomNoHandler= (event) => {
        this.setState({roomNo: event.target.value});
    }
    changeImgHandler= (event) => {
        this.setState({img: event.target.value});
    }

    cancel()
    {
        this.props.history.push('/employees');
    }

    getTitle()
    {
        if(this.state.id === '_add'){
            return <h3 className="text-center p-4 m-2 text-info">Add</h3>
        }else{
            return <h3 className="text-center p-4 m-2 text-info">Update</h3>
        }
    }
    render() 
    {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Patient Name</label>
                                            <input placeholder="Patient Name" name="patienttName" className="form-control" 
                                                value={this.state.patientName} onChange={this.changePatientNameHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Doctor Name </label>
                                            <input placeholder="Doctor Name" name="doctorName" className="form-control" 
                                                value={this.state.doctorName} onChange={this.changeDoctorNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Disease </label>
                                            <input placeholder="Disease" name="disease" className="form-control" 
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
                                        <div className='btn-group'>
                                        <button className="btn btn-success w-auto" onClick={this.saveOrUpdateEmployee}><BsCheckCircleFill/> Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}><BsFillXCircleFill/> Cancel</button>
                                        </div> 
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
