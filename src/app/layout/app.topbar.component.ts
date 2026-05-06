import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../api-services';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.css'],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class AppTopBarComponent implements OnInit, OnDestroy {
  activeItem: MenuItem | undefined;
  items: MenuItem[] = [
    {
      label: 'Calculadora',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/'],
      routerLinkActiveOptions: {
        exact: true,
      },
    },
    {
      label: 'Builds',
      icon: 'pi pi-fw pi-list',
      routerLink: ['/shared-presets'],
    },
    {
      label: 'Ranking de Itens',
      icon: 'pi pi-fw pi-sort-amount-down',
      routerLink: ['/preset-summary'],
      isNew: true,
    } as any,
  ];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  visible: boolean = false;
  visibleInfo: boolean = false;
  visibleReference = false;
  env = environment;

  infos = [
    'ข้อมูลไอเทม มอนสเตอร์ และสกิล ทั้งหมดมาจากเว็บ "divine-pride"',
    'เปลี่ยน Theme ทึ่ปุ่ม Config ตรงขวากลาง',
    'ข้อมูลที่บันทึกไว้จะถูกเก็บไว้ที่ browser, ถ้าล้างข้อมูล browser ก็จะถูกลบไปด้วย',
    'เงื่อนไขที่เขียนไว้ว่า "ทุกๆการเรียนรู้สกิล" ต้องกดอัพในช่อง "Learn to get bonuses" ถึงจะได้ bonus, ถ้าไม่มีให้อัพจะให้เป็น bonus เป็น Lv MAX',
    'options ในแถวอาวุธจะอยู่ตลอด สามารถใช้เป็น What if ได้',
    'My Magical Element ใน options = เพิ่ม Damage ทางเวทมนตร์ธาตุ ...',
    'การเปรียบเทียบอาวุธ 2 มือยังไม่รองรับการเปลี่ยนมือซ้าย',
    'Job 61-64, 66-69 จะได้ Bonus ไม่ตรงเพราะไม่มีข้อมูล',
    'Tab "Summary" คือ ใส่อะไรบ้าง/อัพสกิลอะไรบ้าง/การคำนวนทั้งหมด',
    'Tab "Equipments Summary" คือ bonus ของไอเทมแบบภาพรวม',
    'Tab "Item Descriptions" คือ bonus ของไอเทมแต่ละชิ้นและคำอธิบาย (เอาไว้ตรวจสอบว่าได้ bonus ถูกไหม)',
  ];

  references: { label: string; link: string; writer: string; date?: string; }[] = [
    {
      label: 'Jobs Improvement Bundle Update (20 June 2024)',
      writer: 'RO GGT',
      link: 'https://ro.gnjoy.in.th/bundleupdate13',
    },
    {
      label: 'Old Headgear & Enchant Improve',
      writer: 'RO GGT',
      link: 'https://ro.gnjoy.in.th/old-headgear-enchant-improve',
    },
    {
      label: 'New Elemental Table Adjustment',
      writer: 'RO GGT',
      link: 'https://ro.gnjoy.in.th/new-elemental-table-adjustment',
    },
    {
      label: 'Quarter 1 Class Improvement 2024',
      writer: 'RO GGT',
      link: 'https://ro.gnjoy.in.th/quarter-1-class-improvement-2024',
    },
    {
      label: 'Bonus JOB LV.70',
      writer: 'RO GGT',
      link: 'https://ro.gnjoy.in.th/newyear_adventure_2024/assets/img/additional/Ragnarok-Today/POP-UP-Job-BONUS.jpg',
    },
    {
      label: 'Class Improvement [Sura, Warlock, Minstrel&Wanderer]',
      writer: 'RO GGT',
      link: 'https://ro.gnjoy.in.th/class-improvement-sura-warlock-minstrelwanderer',
    },
    {
      label: 'Skills Balance (1st, 2nd and transcendent classes skills)',
      writer: 'RO GGT',
      link: 'https://ro.gnjoy.in.th/skills-balance-1st-2nd-and-transcendent-classes-skills',
    },
    {
      label: 'Geffen Magic Tournament Enchant System Update!',
      writer: 'RO GGT',
      link: 'https://ro.gnjoy.in.th/geffen-magic-tournament-enchant-system-update',
    },
    {
      label: 'Develop note ! Balance Skill ขยายขีดจำกัดเลเวลสูงสุดของ Extended Class',
      writer: 'RO GGT',
      link: 'https://ro.gnjoy.in.th/develop-note-extended',
    },
    {
      label: 'Items & Monsters & Skill infomation',
      writer: 'DIVINE PRIDE',
      link: 'https://www.divine-pride.net/',
    },
    {
      label: 'Skill infomation',
      writer: 'IRO Wiki',
      link: 'https://irowiki.org/wiki/Main_Page',
    },
    {
      label: 'ATK',
      writer: 'IRO Wiki',
      link: 'https://irowiki.org/wiki/ATK',
    },
    {
      label: 'MATK',
      writer: 'IRO Wiki',
      link: 'https://irowiki.org/wiki/MATK',
    },
    {
      label: 'Malangdo Enchants',
      writer: 'IRO Wiki',
      link: 'https://irowiki.org/wiki/Malangdo_Enchants',
    },
    {
      label: 'KRO : Jobs improvement project',
      writer: 'Sigma',
      link: 'https://www.divine-pride.net/forum/index.php?/topic/3723-kro-jobs-improvement-project',
    },
    {
      label: 'KRO : Episode 17.2 enchant info : Automatic equipment and Sin weapons.',
      writer: 'Sigma',
      link: 'https://www.divine-pride.net/forum/index.php?/topic/4176-kro-episode-172-enchant-info-automatic-equipment-and-sin-weapons',
    },
    {
      label: 'KRO : Glast Heim challenge mode enchant',
      writer: 'Sigma',
      link: 'https://www.divine-pride.net/forum/index.php?/topic/3879-kro-glast-heim-challenge-mode-enchant/',
    },
    {
      label: 'KRO : Thanatos Tower revamp',
      writer: 'Sigma',
      link: 'https://www.divine-pride.net/forum/index.php?/topic/4277-kro-thanatos-tower-revamp/',
    },
    {
      label: 'KRO : Illusion of Under Water',
      writer: 'Sigma',
      link: 'https://www.divine-pride.net/forum/index.php?/topic/4319-kro-illusion-of-under-water',
    },
    {
      label: 'RO Podcast EP 7 : ส่อง KRO patchnote Q4 + คุยเรื่อง debuff',
      writer: 'Sigma the fallen',
      link: 'https://www.youtube.com/live/xUiYYi6o6gA?si=EdJvXnchwtionL_4&t=1515',
    },
    {
      label: 'สกิล Class 4 V2',
      writer: 'Sigma the fallen',
      link: 'https://sigmathefallen.blogspot.com/',
    },
    {
      label: 'เจาะลึก Stat ต่างๆ ใน Renewal Part I : Matk & Mdef',
      writer: 'Sigma the fallen',
      link: 'https://web.facebook.com/notes/3202008843255644/',
    },
    {
      label: 'Enchantment System',
      writer: 'Hazy Forest',
      link: 'https://hazyforest.com/equipment:enchantment_system',
    },
    {
      label: 'Enchant Deadly Poison หรือที่เรียกติดปากกันว่า EDP',
      writer: 'Assing',
      link: 'https://www.pingbooster.com/th/blog/detail/ragnarok-online-edp-enchant-deadly-poison-assassin',
    },
    {
      label: 'คุณสมบัติลับยาแอส ทำยังไงให้ตีแรงที่สุด (โปรดเปิดคำบรรยายเพื่อข้อมูลที่ครบถ้วน)',
      writer: '/\\ssing (แอสซิ่ง)',
      link: 'https://youtu.be/WvSbULJ2CGU?si=Ae5vY9teaGZDXSRB',
    },
    {
      label: 'Enchants',
      writer: 'trifectaro.com',
      link: 'https://trifectaro.com/mediawiki/index.php/Enchants',
    },
    {
      label: 'Open-source RO emulator',
      writer: 'rAthena',
      link: 'https://github.com/rathena/rathena',
    },
    // {
    //   label: '',
    //   writer: '',
    //   link: '',
    // },
  ];

  updates: { v: string; date: string; logs: string[]; }[] = [
    {
      v: 'Beta 0.1',
      date: '2025',
      logs: ['Outage Build - Calculadora de Dano para LatamRO'],
    },
  ];
  localVersion = localStorage.getItem('version') || '';
  lastestVersion = this.updates[0].v;

  unreadVersion = this.updates.findIndex((a) => a.v === this.localVersion);
  showUnreadVersion = this.unreadVersion === -1 ? this.updates.length + 1 : this.unreadVersion;

  visibleUpdate = false;

  username: string;

  obs = [] as Subscription[];

  constructor(
    public layoutService: LayoutService,
    private readonly authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnDestroy(): void {
    for (const subscription of this.obs) {
      subscription?.unsubscribe();
    }
  }

  ngOnInit(): void {
    const o = this.authService.profileEventObs$.subscribe((profile) => {
      this.username = profile?.name;
    });
    this.obs.push(o);
  }

  logout() {
    this.waitConfirm('Logout ?').then((isConfirm) => {
      if (!isConfirm) return;

      this.authService.logout();
      this.messageService.add({
        severity: 'success',
        summary: 'Logout',
      });
    });
  }

  showDialog() {
    this.visible = true;
  }

  showUpdateDialog() {
    this.visibleUpdate = true;
  }

  showReferenceDialog() {
    this.visibleReference = true;
  }

  onHideUpdateDialog() {
    // localStorage.setItem('version', this.updates[0].v);
    // this.showUnreadVersion = 0;
  }

  onReadUpdateClick(version: string) {
    localStorage.setItem('version', version);
    this.unreadVersion = this.updates.findIndex((a) => a.v === version);
    this.showUnreadVersion = this.unreadVersion === -1 ? this.updates.length + 1 : this.unreadVersion;
  }

  showInfoDialog() {
    this.visibleInfo = true;
  }

  showMyProfile() {
    this.layoutService.showMyProfileSidebar();
  }

  private waitConfirm(message: string, icon?: string) {
    return new Promise((res) => {
      this.confirmationService.confirm({
        message: message,
        header: 'Confirmation',
        icon: icon || 'pi pi-exclamation-triangle',
        accept: () => {
          res(true);
        },
        reject: () => {
          console.log('reject confirm');
          res(false);
        },
      });
    });
  }
}
