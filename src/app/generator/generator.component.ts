import { Component, OnInit, ViewChild } from '@angular/core';
import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';
import { FormGroup, FormControl } from '@angular/forms';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  @ViewChild('qrcodeDataMatrix') qrcodeDataMatrix;
  @ViewChild('qrCode') qrCode;
  @ViewChild('barCode') barCode;
  //@ViewChild('dialogResultat') dialogResultat;

  formGroupTxt = new FormGroup({
    text: new FormControl(''),
  });

  formGroupUrl = new FormGroup({
    url: new FormControl(''),
  });

  formGroupPhone = new FormGroup({
    phone: new FormControl(''),
  });

  formGroupSms = new FormGroup({
    sms: new FormControl(''),
    phone: new FormControl(''),
  });

  formGroupCodeBare = new FormGroup({
    valueCodeBare: new FormControl(''),
  });

  formGroupContact = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    organization: new FormControl(''),
    mail: new FormControl(''),
    phoneContact: new FormControl(''),
    cell: new FormControl(''),
    fax: new FormControl(''),
    street: new FormControl(''),
    postcode: new FormControl(''),
    city: new FormControl(''),
    regionOrState: new FormControl(''),
    country: new FormControl(''),
    website: new FormControl(''),
  });

  public displayText: DisplayTextModel = { text: ' ' };
  public typeCode: String = '';

  public codetypes: Array<{ label: string; name: string; icon: string; selected?: boolean }> = [
    { name: 'QR_Code', label: 'QR Code', icon: '', selected: true },
    { name: 'Data_Matrix', label: 'Data Matrix', icon: '' },
    { name: 'Code_Bare', label: 'Code Bare', icon: '' }
  ];
  public dataTypes: Array<{ label: string, name: string, icon: string }> = [
    { name: 'text', label: 'Text', icon: '' },
    { name: 'url', label: 'Url', icon: '', },
    { name: 'contact', label: 'Contact', icon: '' },
    { name: 'phone', label: 'Phone', icon: '' },
    { name: 'sms', label: 'Sms', icon: '', }];
  public isQrCode: Boolean = true;
  public isDataMatrix: Boolean;
  public isCodeBare: Boolean;

  public isText: Boolean = true;
  public isUrl: Boolean;
  public isContact: Boolean;
  public isPhone: Boolean;
  public isSms: Boolean;
  opened: boolean;

  constructor() { }

  ngOnInit(): void {

    this.formGroupTxt.valueChanges.subscribe(x => {
      this.qrCode.value = x.text;
      this.qrcodeDataMatrix.value = x.text;
    })

    this.formGroupUrl.valueChanges.subscribe(x => {
      this.qrCode.value = 'http://' + x.url;
      this.qrcodeDataMatrix.value = 'http://' + x.url;
    })

    this.formGroupPhone.valueChanges.subscribe(x => {
      this.qrCode.value = 'tel:' + x.url;
      this.qrcodeDataMatrix.value = 'tel:' + x.url;
    })

    this.formGroupSms.valueChanges.subscribe(x => {
      this.qrCode.value = 'SMSTO:' + x.phone + ':' + x.sms;
      this.qrcodeDataMatrix.value = 'SMSTO:' + x.phone + ':' + x.sms;
    })

    this.formGroupContact.valueChanges.subscribe(x => {
      let tmp = "BEGIN:VCARD VERSION:3.0 ";
      tmp += "N:" + x.lastName + "; " + x.firstName + " ORG:" + x.organization + " EMAIL;TYPE=INTERNET:" + x.mail + " URL:" + x.website + " TEL;TYPE=CELL:" +
        x.cell + " TEL:" + x.phoneContact + " TEL;TYPE=FAX:" + x.fax + " ADR:;;" + x.street + ";" + x.ciy + ";" + x.regionOrState + ";" + x.postcode + ";" + x.country + "END:VCARD"
      this.qrCode.value = tmp;
      this.qrcodeDataMatrix.value = tmp;
    });

    this.formGroupCodeBare.valueChanges.subscribe(x => {
      this.barCode.value = parseInt(x.valueCodeBare).toString();
      console.log(parseInt(x.valueCodeBare))
    })
  }

  public selectedCodeType(codetype: { name: string; icon: string }): void {
    if (codetype.name == 'QR_Code' || codetype.name == 'Data_Matrix') {
      this.dataTypes = [
        { name: 'text', label: 'Text', icon: '🍕' },
        { name: 'url', label: 'Url', icon: '🍕', },
        { name: 'contact', label: 'Contact', icon: '🍕' },
        { name: 'phone', label: 'Phone', icon: '🍕' },
        { name: 'sms', label: 'sms', icon: '🍕', }];

      if (codetype.name == 'QR_Code') {
        this.isQrCode = true;
        this.isDataMatrix = false;
        this.isCodeBare = false;
      }

      else {
        this.isQrCode = false;
        this.isDataMatrix = true;
        this.isCodeBare = false;
      }
    }

    else {
      this.dataTypes = [];
      this.isQrCode = false;
      this.isDataMatrix = false;
      this.isCodeBare = true;
    }
  }

  public selectedDataType(codetype: { name: string; icon: string }): void {

    switch (codetype.name) {
      case 'text':
        this.isText = true;
        this.isUrl = false;
        this.isContact = false;
        this.isPhone = false;
        this.isSms = false;
        break;

      case 'url':
        this.isText = false;
        this.isUrl = true;
        this.isContact = false;
        this.isPhone = false;
        this.isSms = false;
        console.log(codetype.name);
        break;

      case 'contact':
        this.isText = false;
        this.isUrl = false;
        this.isContact = true;
        this.isPhone = false;
        this.isSms = false;
        break;

      case 'phone':
        this.isText = false;
        this.isUrl = false;
        this.isContact = false;
        this.isPhone = true;
        this.isSms = false;
        break;
      case 'sms':
        this.isText = false;
        this.isUrl = false;
        this.isContact = false;
        this.isPhone = false;
        this.isSms = true;
        break;
      default:
        break;
    }
  }

  saveCode() {
    html2canvas(document.querySelector("#col-code-inner")).then(canvasImage => {
      this.opened = true;
      //canvasImage.id = 'dialog-resultat-canvas';
      setTimeout(() => {
        document.getElementById('dialog-resultat').appendChild(canvasImage);
      }, 1000);
    });
  }

  public close(status) {
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }
}
