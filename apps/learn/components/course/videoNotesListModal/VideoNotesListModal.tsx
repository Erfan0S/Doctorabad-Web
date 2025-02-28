import React from "react";
import styles from "./VideoNotesListModal.module.scss";

interface Note {
  id: string;
  text: string;
  timestamp: string;
}

interface VideoNotesListModalProps {
  notes: Note[];
}

const MOCK_NOTES: Note[] = [
  {
    id: "1",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    timestamp: "03:40",
  },
  {
    id: "2",
    text: "خوبی؟",
    timestamp: "10:35",
  },
  {
    id: "2",
    text: "خوبی؟",
    timestamp: "10:35",
  },
  {
    id: "2",
    text: "خوبی؟",
    timestamp: "10:35",
  },
  {
    id: "2",
    text: "خوبی؟",
    timestamp: "10:35",
  },
  {
    id: "2",
    text: "خوبی؟",
    timestamp: "10:35",
  },
  {
    id: "2",
    text: "خوبی؟",
    timestamp: "10:35",
  },
  {
    id: "2",
    text: "خوبی؟",
    timestamp: "10:35",
  },
  {
    id: "2",
    text: "خوبی؟",
    timestamp: "10:35",
  },
  {
    id: "2",
    text: "خوبی؟",
    timestamp: "10:35",
  },
];

export const VideoNotesListModal: React.FC<VideoNotesListModalProps> = ({
  notes = MOCK_NOTES,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>لیست یادداشت‌ها</div>
      <ul className={styles.notesList}>
        {notes.map((note) => (
          <li key={note.id} className={styles.noteItem}>
            <span className={styles.timestamp}>{note.timestamp}</span>
            <span className={styles.noteText}>{note.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoNotesListModal;
