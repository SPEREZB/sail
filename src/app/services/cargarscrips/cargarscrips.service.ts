import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarscripsService {

  constructor() { }
  scriplogin(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/login.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripjQuery(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/jquery-2.1.0.min.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripBootstrap(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/popper.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripBootstrap1(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/bootstrap.min.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripPlugins(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/owl-carousel.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripPlugins1(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/accordions.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripPlugins2(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/datepicker.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripPlugins3(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/scrollreveal.min.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripPlugins4(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/waypoints.min.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripPlugins5(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/jquery.counterup.min.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripPlugins6(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/imgfix.min.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripPlugins7(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/slick.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripPlugins8(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/lightbox.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripPlugins9(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/isotope.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripGlobalInit(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/custom.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  scripdashboard(archivos: string[]) {
    for (let archivo of archivos) {
      let node = document.createElement('script');
      node.src = "../../../assets/js/script.js";//Change to your js file
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

}
