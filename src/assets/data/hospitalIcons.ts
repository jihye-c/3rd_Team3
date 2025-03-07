import ClinicIcon from '@/assets/icons/clinic.svg';
import TertiaryHospitalIcon from '@/assets/icons/tertiaryHospital.svg';
import GeneralHospitalIcon from '@/assets/icons/generalHospital.svg';
import HospitalIcon from '@/assets/icons/hospital.svg';
import PublicHealthCenterIcon from '@/assets/icons/publicHealthCenter.svg';
import OrientalMedicineClinicIcon from '@/assets/icons/orientalMedicineClinic.svg';
import DentalClinicIcon from '@/assets/icons/dentalClinic.svg';

const hospitalIcons = [
  {id: 'clinic', name: '동네 병원 (의원)', component: ClinicIcon, searchType:'의원'},
  {id: 'tertiaryHospital', name: '상급종합', component: TertiaryHospitalIcon, searchType:'상급종합'},
  {id: 'generalHospital', name: '종합병원', component: GeneralHospitalIcon, searchType:'종합병원'},
  {id: 'hospital', name: '병원', component: HospitalIcon, searchType:'병원'},
  {id: 'publicHealthCenter', name: '보건기관', component: PublicHealthCenterIcon, searchType:'보건기관'},
  {id: 'orientalMedicineClinic', name: '한의원', component: OrientalMedicineClinicIcon, searchType:'한의원'},
  {id: 'dentalClinic', name: '치과', component: DentalClinicIcon, searchType:'치과'},
];

export default hospitalIcons;