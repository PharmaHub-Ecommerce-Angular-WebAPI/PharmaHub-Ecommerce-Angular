import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PharmNameService } from '../../../services/pharm-name.service';

@Component({
  selector: 'app-fillter-phname',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fillter-phname.component.html',
  styleUrl: './fillter-phname.component.css',
})
export class FillterPHnameComponent {
  searchText: string = '';
  showDropdown = false;
  allOptions: string[] = [];
  filteredOptions: string[] = [];

  constructor(private pharmNameService: PharmNameService) {
    this.pharmNameService.pharmNames$.subscribe((names) => {
      this.allOptions = names;
    });
  }

  onSearchChange() {
    const input = this.searchText.trim();

    if (input === '') {
      this.filteredOptions = [];
      this.showDropdown = false;
      this.pharmNameService.setSelectedPharmName(null); // ← عند المسح يرجع يعرض الكل
    } else {
      this.filteredOptions = this.allOptions.filter((option) =>
        option.toLowerCase().includes(input.toLowerCase())
      );
      this.showDropdown = this.filteredOptions.length > 0;
    }
  }

  selectOption(option: string) {
    this.searchText = option;
    this.showDropdown = false;
    this.pharmNameService.setSelectedPharmName(option);
  }
}
