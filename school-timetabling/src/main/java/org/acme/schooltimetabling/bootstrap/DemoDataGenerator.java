package org.acme.schooltimetabling.bootstrap;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import org.acme.schooltimetabling.domain.Lesson;
import org.acme.schooltimetabling.domain.Room;
import org.acme.schooltimetabling.domain.Timeslot;
import org.acme.schooltimetabling.persistence.LessonRepository;
import org.acme.schooltimetabling.persistence.RoomRepository;
import org.acme.schooltimetabling.persistence.TimeslotRepository;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import io.quarkus.runtime.StartupEvent;

@ApplicationScoped
public class DemoDataGenerator {

    @ConfigProperty(name = "timeTable.demoData", defaultValue = "SMALL")
    DemoData demoData;

    @Inject
    TimeslotRepository timeslotRepository;
    @Inject
    RoomRepository roomRepository;
    @Inject
    LessonRepository lessonRepository;

    @Transactional
    public void generateDemoData(@Observes StartupEvent startupEvent) {
        if (demoData == DemoData.NONE) {
            return;
        }

        List<Timeslot> timeslotList = new ArrayList<>();

        for (DayOfWeek day : getDaysForDemoData()) {
            timeslotList.add(new Timeslot(day, LocalTime.of(8, 20), LocalTime.of(9, 55)));
            timeslotList.add(new Timeslot(day, LocalTime.of(10, 5), LocalTime.of(11, 40)));
            timeslotList.add(new Timeslot(day, LocalTime.of(11, 50), LocalTime.of(13, 25)));
            timeslotList.add(new Timeslot(day, LocalTime.of(14, 0), LocalTime.of(15, 35)));
            timeslotList.add(new Timeslot(day, LocalTime.of(15, 45), LocalTime.of(17, 20)));
            timeslotList.add(new Timeslot(day, LocalTime.of(17, 30), LocalTime.of(19, 5)));

            if (demoData == DemoData.LARGE) {
                timeslotList.add(new Timeslot(day, LocalTime.of(8, 50), LocalTime.of(10, 25)));
                timeslotList.add(new Timeslot(day, LocalTime.of(10, 35), LocalTime.of(12, 10)));
                timeslotList.add(new Timeslot(day, LocalTime.of(12, 20), LocalTime.of(13, 55)));
                timeslotList.add(new Timeslot(day, LocalTime.of(14, 30), LocalTime.of(16, 5)));
                timeslotList.add(new Timeslot(day, LocalTime.of(16, 15), LocalTime.of(17, 50)));
                timeslotList.add(new Timeslot(day, LocalTime.of(18, 0), LocalTime.of(19, 35)));
            }
        }
        timeslotRepository.persist(timeslotList);

        List<Room> roomList = new ArrayList<>();
        roomList.add(new Room("Аудитория А"));
        roomList.add(new Room("Аудитория Б"));
        roomList.add(new Room("Аудитория В"));
        if (demoData == DemoData.LARGE) {
            roomList.add(new Room("Аудитория Г"));
            roomList.add(new Room("Аудитория Д"));
            roomList.add(new Room("Аудитория Е"));
        }
        roomRepository.persist(roomList);

        List<Lesson> lessonList = new ArrayList<>();
        lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-101"));
        lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-101"));
        lessonList.add(new Lesson("Физика", "М. Кюри", "PHY-201"));
        lessonList.add(new Lesson("Химия", "М. Кюри", "CHEM-301"));
        lessonList.add(new Lesson("Биология", "Ч. Дарвин", "BIO-401"));
        lessonList.add(new Lesson("История", "И. Джонс", "HIS-501"));
        lessonList.add(new Lesson("Английский", "И. Джонс", "ENG-601"));
        lessonList.add(new Lesson("Английский", "И. Джонс", "ENG-601"));
        lessonList.add(new Lesson("Испанский", "П. Круз", "SPA-701"));
        lessonList.add(new Lesson("Испанский", "П. Круз", "SPA-701"));
        if (demoData == DemoData.LARGE) {
            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-101"));
            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-101"));
            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-101"));
            lessonList.add(new Lesson("ИТ", "А. Тьюринг", "IT-801"));
            lessonList.add(new Lesson("Физика", "М. Кюри", "PHY-201"));
            lessonList.add(new Lesson("География", "Ч. Дарвин", "GEO-901"));
            lessonList.add(new Lesson("Геология", "Ч. Дарвин", "GEO-1001"));
            lessonList.add(new Lesson("История", "И. Джонс", "HIS-501"));
            lessonList.add(new Lesson("Английский", "И. Джонс", "ENG-601"));
            lessonList.add(new Lesson("Драма", "И. Джонс", "DRA-1101"));
            lessonList.add(new Lesson("Искусство", "С. Дали", "ART-1201"));
            lessonList.add(new Lesson("Искусство", "С. Дали", "ART-1201"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1301"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1301"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1301"));
        }

        lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-102"));
        lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-102"));
        lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-102"));
        lessonList.add(new Lesson("Физика", "М. Кюри", "PHY-202"));
        lessonList.add(new Lesson("Химия", "М. Кюри", "CHEM-302"));
        lessonList.add(new Lesson("Французский", "М. Кюри", "FR-402"));
        lessonList.add(new Lesson("География", "Ч. Дарвин", "GEO-902"));
        lessonList.add(new Lesson("История", "И. Джонс", "HIS-502"));
        lessonList.add(new Lesson("Английский", "П. Круз", "ENG-602"));
        lessonList.add(new Lesson("Испанский", "П. Круз", "SPA-702"));
        if (demoData == DemoData.LARGE) {
            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-103"));
            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-103"));
            lessonList.add(new Lesson("ИТ", "А. Тьюринг", "IT-802"));
            lessonList.add(new Lesson("Физика", "М. Кюри", "PHY-202"));
            lessonList.add(new Lesson("Биология", "Ч. Дарвин", "BIO-402"));
            lessonList.add(new Lesson("Геология", "Ч. Дарвин", "GEO-1002"));
            lessonList.add(new Lesson("История", "И. Джонс", "HIS-503"));
            lessonList.add(new Lesson("Английский", "П. Круз", "ENG-603"));
            lessonList.add(new Lesson("Английский", "П. Круз", "ENG-603"));
            lessonList.add(new Lesson("Драма", "И. Джонс", "DRA-1102"));
            lessonList.add(new Lesson("Искусство", "С. Дали", "ART-1202"));
            lessonList.add(new Lesson("Искусство", "С. Дали", "ART-1202"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1302"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1302"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1302"));

            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-104"));
            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-104"));
            lessonList.add(new Lesson("ИТ", "А. Тьюринг", "IT-803"));
            lessonList.add(new Lesson("Физика", "М. Кюри", "PHY-203"));
            lessonList.add(new Lesson("Химия", "М. Кюри", "CHEM-303"));
            lessonList.add(new Lesson("Французский", "М. Кюри", "FR-403"));
            lessonList.add(new Lesson("Физика", "М. Кюри", "PHY-203"));
            lessonList.add(new Lesson("География", "Ч. Дарвин", "GEO-903"));
            lessonList.add(new Lesson("Биология", "Ч. Дарвин", "BIO-403"));
            lessonList.add(new Lesson("Геология", "Ч. Дарвин", "GEO-1003"));
            lessonList.add(new Lesson("История", "И. Джонс", "HIS-504"));
            lessonList.add(new Lesson("История", "И. Джонс", "HIS-504"));
            lessonList.add(new Lesson("Английский", "П. Круз", "ENG-604"));
            lessonList.add(new Lesson("Английский", "П. Круз", "ENG-604"));
            lessonList.add(new Lesson("Английский", "П. Круз", "ENG-604"));
            lessonList.add(new Lesson("Испанский", "П. Круз", "SPA-703"));
            lessonList.add(new Lesson("Драма", "П. Круз", "DRA-1103"));
            lessonList.add(new Lesson("Искусство", "С. Дали", "ART-1203"));
            lessonList.add(new Lesson("Искусство", "С. Дали", "ART-1203"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1303"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1303"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1303"));

            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-105"));
            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-105"));
            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-105"));
            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-105"));
            lessonList.add(new Lesson("Математика", "А. Тьюринг", "CS-105"));
            lessonList.add(new Lesson("ИТ", "А. Тьюринг", "IT-804"));
            lessonList.add(new Lesson("Физика", "М. Кюри", "PHY-204"));
            lessonList.add(new Lesson("Химия", "М. Кюри", "CHEM-304"));
            lessonList.add(new Lesson("Французский", "М. Кюри", "FR-404"));
            lessonList.add(new Lesson("Физика", "М. Кюри", "PHY-204"));
            lessonList.add(new Lesson("География", "Ч. Дарвин", "GEO-904"));
            lessonList.add(new Lesson("Биология", "Ч. Дарвин", "BIO-404"));
            lessonList.add(new Lesson("Геология", "Ч. Дарвин", "GEO-1004"));
            lessonList.add(new Lesson("История", "И. Джонс", "HIS-505"));
            lessonList.add(new Lesson("История", "И. Джонс", "HIS-505"));
            lessonList.add(new Lesson("Английский", "П. Круз", "ENG-605"));
            lessonList.add(new Lesson("Английский", "П. Круз", "ENG-605"));
            lessonList.add(new Lesson("Английский", "П. Круз", "ENG-605"));
            lessonList.add(new Lesson("Испанский", "П. Круз", "SPA-704"));
            lessonList.add(new Lesson("Драма", "П. Круз", "DRA-1104"));
            lessonList.add(new Lesson("Искусство", "С. Дали", "ART-1204"));
            lessonList.add(new Lesson("Искусство", "С. Дали", "ART-1204"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1304"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1304"));
            lessonList.add(new Lesson("Физическая культура", "С. Льюис", "PE-1304"));
        }

        Lesson lesson = lessonList.get(0);
        lesson.setTimeslot(timeslotList.get(0));
        lesson.setRoom(roomList.get(0));

        lessonRepository.persist(lessonList);
    }

    private List<DayOfWeek> getDaysForDemoData() {
        List<DayOfWeek> days = new ArrayList<>();
        days.add(DayOfWeek.MONDAY);
        days.add(DayOfWeek.TUESDAY);
        if (demoData == DemoData.LARGE) {
            days.add(DayOfWeek.WEDNESDAY);
            days.add(DayOfWeek.THURSDAY);
            days.add(DayOfWeek.FRIDAY);
        }
        return days;
    }

    public enum DemoData {
        NONE,
        SMALL,
        LARGE
    }

}

