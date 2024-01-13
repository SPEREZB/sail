import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-support-language', 
  templateUrl: './support-language.component.html', 
  styleUrls: ['./support-language.component.css'],
})
export class SupportLanguageComponent {  
  messages: string[] = [];
  language: string = 'es'; 
  constructor(private storage: AngularFireStorage) {}

  sendMessage() {
    const messageTextarea = document.querySelector('.message-display') as HTMLTextAreaElement;
    const userMessageTextarea = document.querySelector('.user-input textarea') as HTMLTextAreaElement;

    const message = userMessageTextarea.value;
    const timestamp = new Date().toLocaleString();

    const formattedMessage = `${message}\n`;
    this.messages.push(formattedMessage);
 
    messageTextarea.value = this.messages.join('');
 
    this.generateAndUploadPDF();
  }

  generateAndUploadPDF() {
    const doc = new jsPDF();
 
    this.messages.forEach((message, index) => {
      doc.text(message, 10, 10 + index * 10);
    });
 
    const pdfBlob = doc.output('blob');  
    saveAs(pdfBlob, 'mensajes.pdf');

    }
}
