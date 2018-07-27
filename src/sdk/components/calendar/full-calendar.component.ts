import { Component, ViewChild } from '@angular/core';
import { ViewBase } from '../../core/ViewBase';
import { Options } from 'fullcalendar';
import { CalendarComponent } from 'ng-fullcalendar';

@Component({
    selector: 'full-calendar',
    template: `
        <div>
            <ng-fullcalendar #ucCalendar [options]="calendarOptions"
                             (eventClick)="eventClick($event.detail)"
                             (eventDrop)="updateEvent($event.detail)"
                             (eventResize)="updateEvent($event.detail)"
                             (clickButton)="clickButton($event.detail)">
            </ng-fullcalendar>
        </div>
    `
})
export class FullCalendarComponent extends ViewBase {
    // Calendar
    calendarOptions: Options;
    displayEvent: any;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

    initComponent() {
        this.calendarOptions = this.getCalendarOption();
    }

    // Calendar
    getCalendarOption() {
        return {
            editable: true,
            eventLimit: false,
            firstDay: 0,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            events: [
                {
                    title: 'event1',
                    start: '2018-01-01',
                    end: '2018-01-02',
                },
                {
                    title: 'event1',
                    start: '2018-01-08',
                    end: '2018-01-11T12:30:00',
                }
            ],
            color: 'black',
            textColor: 'yellow' // an option!
        };
    }

    clickButton(model: any) {
        // this.displayEvent = model;
    }

    eventClick(model: any) {
        // model = {
        //     event: {
        //         id: model.event.id,
        //         start: model.event.start,
        //         end: model.event.end,
        //         title: model.event.title,
        //         allDay: model.event.allDay
        //         // other params
        //     },
        //     duration: {}
        // };
        // this.displayEvent = model;
    }

    updateEvent(model: any) {
        // model = {
        //     event: {
        //         id: model.event.id,
        //         start: model.event.start,
        //         end: model.event.end,
        //         title: model.event.title
        //         // other params
        //     },
        //     duration: {
        //         _data: model.duration._data
        //     }
        // };
        // this.displayEvent = model;
    }
}

