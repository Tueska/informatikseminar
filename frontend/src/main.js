import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFacF5JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diUX5fc3dQRGdaWUU=');

createApp(App).use(store).use(router).mount('#app')
