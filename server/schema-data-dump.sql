--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.1

-- Started on 2016-05-24 16:45:33 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 8 (class 2615 OID 16582)
-- Name: Faraday; Type: SCHEMA; Schema: -; Owner: faraday
--

CREATE SCHEMA "Faraday";


ALTER SCHEMA "Faraday" OWNER TO faraday;

SET search_path = "Faraday", pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 182 (class 1259 OID 16583)
-- Name: Course; Type: TABLE; Schema: Faraday; Owner: faraday
--

CREATE TABLE "Course" (
    id integer NOT NULL,
    prefix text,
    number text,
    title text,
    active boolean DEFAULT false,
    department integer
);


ALTER TABLE "Course" OWNER TO faraday;

--
-- TOC entry 183 (class 1259 OID 16590)
-- Name: Department; Type: TABLE; Schema: Faraday; Owner: faraday
--

CREATE TABLE "Department" (
    id integer NOT NULL,
    name text
);


ALTER TABLE "Department" OWNER TO faraday;

--
-- TOC entry 184 (class 1259 OID 16596)
-- Name: Department_id_seq; Type: SEQUENCE; Schema: Faraday; Owner: faraday
--

CREATE SEQUENCE "Department_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Department_id_seq" OWNER TO faraday;

--
-- TOC entry 2412 (class 0 OID 0)
-- Dependencies: 184
-- Name: Department_id_seq; Type: SEQUENCE OWNED BY; Schema: Faraday; Owner: faraday
--

ALTER SEQUENCE "Department_id_seq" OWNED BY "Department".id;


--
-- TOC entry 185 (class 1259 OID 16598)
-- Name: Section; Type: TABLE; Schema: Faraday; Owner: faraday
--

CREATE TABLE "Section" (
    id integer NOT NULL,
    reg_number text,
    title text,
    course_id integer,
    term_id integer
);


ALTER TABLE "Section" OWNER TO faraday;

--
-- TOC entry 186 (class 1259 OID 16604)
-- Name: Section_id_seq; Type: SEQUENCE; Schema: Faraday; Owner: faraday
--

CREATE SEQUENCE "Section_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Section_id_seq" OWNER TO faraday;

--
-- TOC entry 2413 (class 0 OID 0)
-- Dependencies: 186
-- Name: Section_id_seq; Type: SEQUENCE OWNED BY; Schema: Faraday; Owner: faraday
--

ALTER SEQUENCE "Section_id_seq" OWNED BY "Section".id;


--
-- TOC entry 187 (class 1259 OID 16606)
-- Name: Term; Type: TABLE; Schema: Faraday; Owner: faraday
--

CREATE TABLE "Term" (
    id integer NOT NULL,
    name text,
    start_date date,
    end_date date
);


ALTER TABLE "Term" OWNER TO faraday;

--
-- TOC entry 188 (class 1259 OID 16612)
-- Name: Term_id_seq; Type: SEQUENCE; Schema: Faraday; Owner: faraday
--

CREATE SEQUENCE "Term_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Term_id_seq" OWNER TO faraday;

--
-- TOC entry 2414 (class 0 OID 0)
-- Dependencies: 188
-- Name: Term_id_seq; Type: SEQUENCE OWNED BY; Schema: Faraday; Owner: faraday
--

ALTER SEQUENCE "Term_id_seq" OWNED BY "Term".id;


--
-- TOC entry 189 (class 1259 OID 16614)
-- Name: untitled_table_id_seq; Type: SEQUENCE; Schema: Faraday; Owner: faraday
--

CREATE SEQUENCE untitled_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE untitled_table_id_seq OWNER TO faraday;

--
-- TOC entry 2415 (class 0 OID 0)
-- Dependencies: 189
-- Name: untitled_table_id_seq; Type: SEQUENCE OWNED BY; Schema: Faraday; Owner: faraday
--

ALTER SEQUENCE untitled_table_id_seq OWNED BY "Course".id;


--
-- TOC entry 2271 (class 2604 OID 16644)
-- Name: id; Type: DEFAULT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Course" ALTER COLUMN id SET DEFAULT nextval('untitled_table_id_seq'::regclass);


--
-- TOC entry 2272 (class 2604 OID 16645)
-- Name: id; Type: DEFAULT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Department" ALTER COLUMN id SET DEFAULT nextval('"Department_id_seq"'::regclass);


--
-- TOC entry 2273 (class 2604 OID 16646)
-- Name: id; Type: DEFAULT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Section" ALTER COLUMN id SET DEFAULT nextval('"Section_id_seq"'::regclass);


--
-- TOC entry 2274 (class 2604 OID 16647)
-- Name: id; Type: DEFAULT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Term" ALTER COLUMN id SET DEFAULT nextval('"Term_id_seq"'::regclass);


--
-- TOC entry 2400 (class 0 OID 16583)
-- Dependencies: 182
-- Data for Name: Course; Type: TABLE DATA; Schema: Faraday; Owner: faraday
--

INSERT INTO "Course" VALUES (1, 'COS', '120', 'Introduction to Computational Problem Solving', true, 1);
INSERT INTO "Course" VALUES (2, 'COS', '243', 'Multi-tier Web Applications', false, 1);
INSERT INTO "Course" VALUES (3, 'COS', '121', 'Foundations of Computer Science', false, 1);
INSERT INTO "Course" VALUES (4, 'MAT', '210', 'Introduction to Statistics', true, 2);
INSERT INTO "Course" VALUES (5, 'MAT', '215', 'Discrete Mathematics for Computer Science', true, 2);
INSERT INTO "Course" VALUES (6, 'BIB', '110', 'Old Testament Survey', true, 3);
INSERT INTO "Course" VALUES (7, 'BIB', '210', 'New Testament Survey', true, 3);
INSERT INTO "Course" VALUES (8, 'PHY', '100', 'General Physics', false, 4);


--
-- TOC entry 2401 (class 0 OID 16590)
-- Dependencies: 183
-- Data for Name: Department; Type: TABLE DATA; Schema: Faraday; Owner: faraday
--

INSERT INTO "Department" VALUES (1, 'Computer Science');
INSERT INTO "Department" VALUES (2, 'Math');
INSERT INTO "Department" VALUES (3, 'Biblical Literature');
INSERT INTO "Department" VALUES (4, 'Physics');


--
-- TOC entry 2416 (class 0 OID 0)
-- Dependencies: 184
-- Name: Department_id_seq; Type: SEQUENCE SET; Schema: Faraday; Owner: faraday
--

SELECT pg_catalog.setval('"Department_id_seq"', 1, false);


--
-- TOC entry 2403 (class 0 OID 16598)
-- Dependencies: 185
-- Data for Name: Section; Type: TABLE DATA; Schema: Faraday; Owner: faraday
--

INSERT INTO "Section" VALUES (1, '76245', 'Class 1', 1, 3);
INSERT INTO "Section" VALUES (2, '54145', 'Class 1', 3, 5);
INSERT INTO "Section" VALUES (3, '87642', 'Class 2', 3, 5);
INSERT INTO "Section" VALUES (4, '54146', 'Class 2', 1, 3);
INSERT INTO "Section" VALUES (5, '43123', 'Lab 1', 1, 3);
INSERT INTO "Section" VALUES (6, '54147', 'Lab 1', 3, 5);
INSERT INTO "Section" VALUES (7, '51512', 'Lab 2', 3, 5);
INSERT INTO "Section" VALUES (8, '54148', 'Lab 2', 1, 3);
INSERT INTO "Section" VALUES (9, '51764', 'Class 1', 2, 8);
INSERT INTO "Section" VALUES (10, '83561', 'Class 1', 4, 5);
INSERT INTO "Section" VALUES (11, '77467', 'Class 1', 5, 8);
INSERT INTO "Section" VALUES (12, '54614', 'Class 1', 5, 3);
INSERT INTO "Section" VALUES (13, '65134', 'Class 1', 6, 4);
INSERT INTO "Section" VALUES (14, '65434', 'Class 1', 7, 4);
INSERT INTO "Section" VALUES (15, '45414', 'Class 1 1st Semester', 8, 3);
INSERT INTO "Section" VALUES (16, '57517', 'Class 2 2nd Semester', 8, 5);


--
-- TOC entry 2417 (class 0 OID 0)
-- Dependencies: 186
-- Name: Section_id_seq; Type: SEQUENCE SET; Schema: Faraday; Owner: faraday
--

SELECT pg_catalog.setval('"Section_id_seq"', 16, true);


--
-- TOC entry 2405 (class 0 OID 16606)
-- Dependencies: 187
-- Data for Name: Term; Type: TABLE DATA; Schema: Faraday; Owner: faraday
--

INSERT INTO "Term" VALUES (3, 'Fall 2015', '2015-09-01', '2015-12-01');
INSERT INTO "Term" VALUES (4, 'Interim 2015', '2016-01-01', '2016-01-31');
INSERT INTO "Term" VALUES (5, 'Spring 2016', '2016-02-01', '2016-05-01');
INSERT INTO "Term" VALUES (8, 'Fall 2016', '2016-09-01', '2016-12-01');


--
-- TOC entry 2418 (class 0 OID 0)
-- Dependencies: 188
-- Name: Term_id_seq; Type: SEQUENCE SET; Schema: Faraday; Owner: faraday
--

SELECT pg_catalog.setval('"Term_id_seq"', 8, true);


--
-- TOC entry 2419 (class 0 OID 0)
-- Dependencies: 189
-- Name: untitled_table_id_seq; Type: SEQUENCE SET; Schema: Faraday; Owner: faraday
--

SELECT pg_catalog.setval('untitled_table_id_seq', 8, true);


--
-- TOC entry 2276 (class 2606 OID 16621)
-- Name: Course_pkey; Type: CONSTRAINT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- TOC entry 2278 (class 2606 OID 16623)
-- Name: Department_pkey; Type: CONSTRAINT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY (id);


--
-- TOC entry 2280 (class 2606 OID 16625)
-- Name: Section_pkey; Type: CONSTRAINT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Section"
    ADD CONSTRAINT "Section_pkey" PRIMARY KEY (id);


--
-- TOC entry 2282 (class 2606 OID 16627)
-- Name: Term_pkey; Type: CONSTRAINT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Term"
    ADD CONSTRAINT "Term_pkey" PRIMARY KEY (id);


--
-- TOC entry 2283 (class 2606 OID 16628)
-- Name: Course_department_fkey; Type: FK CONSTRAINT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Course"
    ADD CONSTRAINT "Course_department_fkey" FOREIGN KEY (department) REFERENCES "Department"(id);


--
-- TOC entry 2284 (class 2606 OID 16633)
-- Name: Section_course_id_fkey; Type: FK CONSTRAINT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Section"
    ADD CONSTRAINT "Section_course_id_fkey" FOREIGN KEY (course_id) REFERENCES "Course"(id);


--
-- TOC entry 2285 (class 2606 OID 16638)
-- Name: Section_term_id_fkey; Type: FK CONSTRAINT; Schema: Faraday; Owner: faraday
--

ALTER TABLE ONLY "Section"
    ADD CONSTRAINT "Section_term_id_fkey" FOREIGN KEY (term_id) REFERENCES "Term"(id);


-- Completed on 2016-05-24 16:45:33 EDT

--
-- PostgreSQL database dump complete
--

