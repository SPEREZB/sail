import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { ChatService } from 'src/app/services/chat/chat.service';
import { IaService } from 'src/app/services/ia/ia.service';

@Component({
  selector: 'app-support-language', 
  templateUrl: './support-language.component.html', 
  styleUrls: ['./support-language.component.css'],
})
export class SupportLanguageComponent implements OnInit {  
  messages: string[] = [];
  storeMessage: string = '';
  userMessage: string = ''; 
  jsonData: string="";
  responseia:any;
  selectedLanguage: string= '';
  constructor(private storage: AngularFireStorage, private chatService: ChatService,
    private ia: IaService) {}
 

  ngOnInit(): void {
    const chatId = 'chat1'; // Ajusta esto según tu lógica para identificar el chat
    
    this.chatService.getPDF(chatId).subscribe((data: string[]) => {
      // Remover comas después de saltos de línea en cada cadena
      const cleanedData = data.map((message: string) => message.replace(/\n,/g, '\n'));
      this.jsonData = cleanedData.join('\n');
    });
  }

  onLanguageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement)?.value;

    if (selectedValue !== undefined) {
      this.selectedLanguage = selectedValue; 
    }
  }


  sendMessage(): void {
    this.messages = [];

    const formattedMessage = `${this.userMessage}\n`;
    this.messages.push(formattedMessage);

    this.userMessage = '';
    const fakeTextareaContent = document.querySelector('.fake-textarea')?.textContent || '';
    this.messages.unshift(fakeTextareaContent); 
 
  this.jsonData = this.messages.join('\n');
   
  this.someFunction(formattedMessage); 

 
 } 


 someFunction(prompt:string) { 
  this.ia.getResponseIA(prompt,this.selectedLanguage)
    .then((response) => {
      this.responseia = response;
      this.messages.push(this.responseia);
 
      this.jsonData = this.messages.join('\n');

      const chatId = 'chat1';
      this.chatService.saveChat(this.messages, chatId); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
 
} 