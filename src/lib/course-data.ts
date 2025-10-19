import type { CourseData } from './types';

export const courseData: CourseData = {
  title: 'دورة: مقدمة في تحريك الألعاب ثلاثية الأبعاد (Gameplay Animation)',
  chapters: [
    {
      id: 'chapter-1',
      title: 'الفصل الأول: الأساسيات',
      introduction: {
        title: 'المقدمة',
        youtubeId: 'c0Zqb5Oo7rY',
        files: [
          {
            name: 'محتوى الفيديو',
            url: 'https://drive.google.com/drive/folders/171ldcgQ02y7uyWv3qdtMZzYafvhl0Mdl?usp=drive_link',
            isMain: true,
          },
        ],
      },
      content: [
        { title: 'ما هو تحريك اللعب؟' },
        { title: 'مبادئ التحريك الـ 12 في سياق الألعاب' },
        { title: 'مجموعة أدواتك الرقمية: Maya/Blender' },
        { title: 'الميكانيكا الأساسية: التوقيت، التباعد، والوزن' },
      ],
    },
    {
      id: 'chapter-2',
      title: 'الفصل الثاني: الوضعيات والشخصية',
      introduction: { title: 'المقدمة', youtubeId: 'uDqjIdI4bF4', files: [] },
      content: [
        { title: 'قوة الوضعية (Pose) وإنشاء صور ظلية' },
        { title: 'تحديد هوية الشخصية بالوضعيات' },
        { title: 'خط الحركة والتوازن' },
        { title: 'تجهيز الوضعيات الرئيسية (Blocking)' },
      ],
    },
    {
      id: 'chapter-3',
      title: 'الفصل الثالث: ميكانيكا الجسم الأساسية',
      introduction: { title: 'المقدمة', youtubeId: 'uDqjIdI4bF4', files: [] },
      content: [
        { title: 'دورة المشي' },
        { title: 'دورة الجري الديناميكية' },
        { title: 'مراحل القفز الثلاث' },
      ],
    },
    {
      id: 'chapter-4',
      title: 'الفصل الرابع: بث الحياة في الشخصيات: حركة الوقوف (Idle)',
      introduction: { title: 'المقدمة', youtubeId: 'uDqjIdI4bF4', files: [] },
      content: [
        { title: 'حركات التنفس والحركات الثانوية' },
        { title: 'إضفاء طابع شخصي على الوقفة' },
        { title: 'بناء حلقة حركة متكاملة للوقوف' },
      ],
    },
    {
      id: 'chapter-5',
      title: 'الفصل الخامس: تحريك القتال',
      introduction: { title: 'المقدمة', youtubeId: 'uDqjIdI4bF4', files: [] },
      content: [
        { title: 'الهجمات اليدوية (Melee)' },
        { title: 'الهجمات بعيدة المدى' },
        { title: 'ردود الفعل وتلقي الضربات' },
      ],
    },
    {
      id: 'chapter-6',
      title: 'الفصل السادس: التطبيق داخل محرك الألعاب',
      introduction: { title: 'المقدمة', youtubeId: 'uDqjIdI4bF4', files: [] },
      content: [
        { title: 'تجهيز الحركات للتصدير' },
        { title: 'مقدمة لنظام التحريك في Unity/Unreal' },
        { title: 'بناء آلات الحالة (State Machines)' },
        { title: 'أشجار الدمج (Blend Trees)' },
      ],
    },
    {
      id: 'chapter-7',
      title: 'الفصل السابع: المشروع النهائي',
      introduction: { title: 'المقدمة', youtubeId: 'uDqjIdI4bF4', files: [] },
      content: [
        { title: 'موجز المشروع' },
        { title: 'صقل عملك بالـ Graph Editor' },
        { title: 'إنشاء فيديو استعراضي (Demo Reel)' },
      ],
    },
    {
      id: 'chapter-8',
      title: 'فصل اختياري: فهم الهيكل العظمي (Rig)',
      introduction: { title: 'المقدمة', youtubeId: 'uDqjIdI4bF4', files: [] },
      content: [
        { title: 'ما هو الهيكل العظمي؟' },
        { title: 'التحريك الأمامي (FK) والعكسي (IK)' },
        { title: 'التعامل مع هيكل جاهز' },
      ],
    },
  ],
};
