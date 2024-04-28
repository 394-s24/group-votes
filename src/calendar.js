import React, { Component } from 'react';

// Calendar Component
// add weekdays, all 12 months, current day
export default class Calendar extends Component {
    constructor() {
        super();
        
        
        this.weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        this.months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        this.state = {
            currentDay: new Date()
        }
        };

    render() {
        return (
            <div>
                <h1>Calendar Component</h1>
                <h2>{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
            </div>
        );
    }
}
