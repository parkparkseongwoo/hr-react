// project import
import { NavItemType } from 'types';

// ==============================|| MENU TYPES ||============================== //

export interface ColumnProps {
  id: any;
  label: string;
}

export interface HolidayTO {
  applyDay?: string;
  holidayName?: string;
  holidayCode?: string;
  note?: string;
  status?: string;
}

export interface WorkTimeTO {
  applyYear: any;
  attendTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  quitTime: string;
  dinnerStartTime: string;
  dinnerEndTime: string;
  overEndTime: string;
  nightEndTime: string;
  status?: any;
  showTextFields?: boolean;
}

export interface DepTO {
  deptCode?: string | null;
  deptName?: string | null;
  deptTel?: string | null;
  status?: string | null;
  id?: string | null;
}

export interface PositionTO {
  positionCode?: string;
  position?: string;
  basesalary?: string;
  hobongratio?: string;
  error?: string;
  status?: string;
}

export interface HobongTO {
  hobongLevel?: string;
  baseSalary?: number;
  positionAllowance?:number;
  longevityBonus?:number;
  totalHobong?:number;
}