<template>
  <div id='app'>
    <ejs-schedule height='550px' width='100%' :selectedDate='selectedDate' :eventSettings='eventSettings'
      :firstDayOfWeek='1'>
      <e-views>
        <e-view option='Week'></e-view>
        <e-view option='Month' showWeekend=false></e-view>
      </e-views>
      <e-resources>
        <e-resource field="OwnerId" title="Owner" name="Owners" :dataSource="ownerDataSource" textField="OwnerText"
          idField="Id" colorField="OwnerColor">
        </e-resource>
      </e-resources>
    </ejs-schedule>
  </div>
</template>
<script>
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective } from "@syncfusion/ej2-vue-schedule";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

var remoteData = new DataManager({
  url: "http://localhost:3000/api/schedule",
  adaptor: new UrlAdaptor(),
  crossDomain: true,
  headers: [{
    'CalCookie': document.cookie,
  }]
});

export default {
  name: "CalenderSchedule",
  // Declaring component and its directives
  components: {
    'ejs-schedule': ScheduleComponent,
    'e-views': ViewsDirective,
    'e-view': ViewDirective,
    'e-resources': ResourcesDirective,
    'e-resource': ResourceDirective
  },
  // Bound properties declaration
  data() {
    return {
      selectedDate: new Date(),
      allowMultiple: true,
      ownerDataSource: [
        { OwnerText: 'Küche', Id: 1, OwnerColor: '#ba8a04' },
        { OwnerText: 'Badezimmer', Id: 2, OwnerColor: '#22c7c7' },
        { OwnerText: 'Wohnzimmer', Id: 3, OwnerColor: '#349e3f' },
        { OwnerText: 'Waschküche', Id: 4, OwnerColor: '#1c77d9' },
        { OwnerText: 'Putzplan', Id: 5, OwnerColor: '#fb00ff' },
        { OwnerText: 'Other', Id: 6, OwnerColor: '#123123' },
      ],
      eventSettings: {
        dataSource: remoteData
      },
    };
  },
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]
  }
};
</script>

<style>
@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';
</style>