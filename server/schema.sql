--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Faraday; Type: SCHEMA; Schema: -; Owner: abramjstamper
--

CREATE DATABASE "Faraday";

CREATE SCHEMA "Faraday";


ALTER SCHEMA "Faraday" OWNER TO abramjstamper;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = "Faraday", pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Course; Type: TABLE; Schema: Faraday; Owner: abramjstamper
--

CREATE TABLE "Course" (
    id integer NOT NULL,
    prefix text,
    number text,
    title text,
    active boolean DEFAULT false,
    department integer
);


ALTER TABLE "Course" OWNER TO abramjstamper;

--
-- Name: Department; Type: TABLE; Schema: Faraday; Owner: abramjstamper
--

CREATE TABLE "Department" (
    id integer NOT NULL,
    name text
);


ALTER TABLE "Department" OWNER TO abramjstamper;

--
-- Name: Department_id_seq; Type: SEQUENCE; Schema: Faraday; Owner: abramjstamper
--

CREATE SEQUENCE "Department_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Department_id_seq" OWNER TO abramjstamper;

--
-- Name: Department_id_seq; Type: SEQUENCE OWNED BY; Schema: Faraday; Owner: abramjstamper
--

ALTER SEQUENCE "Department_id_seq" OWNED BY "Department".id;


--
-- Name: Section; Type: TABLE; Schema: Faraday; Owner: abramjstamper
--

CREATE TABLE "Section" (
    id integer NOT NULL,
    reg_number text,
    title text,
    course_id integer,
    term_id integer
);


ALTER TABLE "Section" OWNER TO abramjstamper;

--
-- Name: Section_id_seq; Type: SEQUENCE; Schema: Faraday; Owner: abramjstamper
--

CREATE SEQUENCE "Section_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Section_id_seq" OWNER TO abramjstamper;

--
-- Name: Section_id_seq; Type: SEQUENCE OWNED BY; Schema: Faraday; Owner: abramjstamper
--

ALTER SEQUENCE "Section_id_seq" OWNED BY "Section".id;


--
-- Name: Term; Type: TABLE; Schema: Faraday; Owner: abramjstamper
--

CREATE TABLE "Term" (
    id integer NOT NULL,
    name text,
    start_date date,
    end_date date
);


ALTER TABLE "Term" OWNER TO abramjstamper;

--
-- Name: Term_id_seq; Type: SEQUENCE; Schema: Faraday; Owner: abramjstamper
--

CREATE SEQUENCE "Term_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Term_id_seq" OWNER TO abramjstamper;

--
-- Name: Term_id_seq; Type: SEQUENCE OWNED BY; Schema: Faraday; Owner: abramjstamper
--

ALTER SEQUENCE "Term_id_seq" OWNED BY "Term".id;


--
-- Name: untitled_table_id_seq; Type: SEQUENCE; Schema: Faraday; Owner: abramjstamper
--

CREATE SEQUENCE untitled_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE untitled_table_id_seq OWNER TO abramjstamper;

--
-- Name: untitled_table_id_seq; Type: SEQUENCE OWNED BY; Schema: Faraday; Owner: abramjstamper
--

ALTER SEQUENCE untitled_table_id_seq OWNED BY "Course".id;


--
-- Name: id; Type: DEFAULT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Course" ALTER COLUMN id SET DEFAULT nextval('untitled_table_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Department" ALTER COLUMN id SET DEFAULT nextval('"Department_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Section" ALTER COLUMN id SET DEFAULT nextval('"Section_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Term" ALTER COLUMN id SET DEFAULT nextval('"Term_id_seq"'::regclass);


--
-- Data for Name: Course; Type: TABLE DATA; Schema: Faraday; Owner: abramjstamper
--

COPY "Course" (id, prefix, number, title, active, department) FROM stdin;
\.


--
-- Data for Name: Department; Type: TABLE DATA; Schema: Faraday; Owner: abramjstamper
--

COPY "Department" (id, name) FROM stdin;
\.


--
-- Name: Department_id_seq; Type: SEQUENCE SET; Schema: Faraday; Owner: abramjstamper
--

SELECT pg_catalog.setval('"Department_id_seq"', 1, false);


--
-- Data for Name: Section; Type: TABLE DATA; Schema: Faraday; Owner: abramjstamper
--

COPY "Section" (id, reg_number, title, course_id, term_id) FROM stdin;
\.


--
-- Name: Section_id_seq; Type: SEQUENCE SET; Schema: Faraday; Owner: abramjstamper
--

SELECT pg_catalog.setval('"Section_id_seq"', 1, false);


--
-- Data for Name: Term; Type: TABLE DATA; Schema: Faraday; Owner: abramjstamper
--

COPY "Term" (id, name, start_date, end_date) FROM stdin;
\.


--
-- Name: Term_id_seq; Type: SEQUENCE SET; Schema: Faraday; Owner: abramjstamper
--

SELECT pg_catalog.setval('"Term_id_seq"', 1, false);


--
-- Name: untitled_table_id_seq; Type: SEQUENCE SET; Schema: Faraday; Owner: abramjstamper
--

SELECT pg_catalog.setval('untitled_table_id_seq', 1, false);


--
-- Name: Course_pkey; Type: CONSTRAINT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: Department_pkey; Type: CONSTRAINT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY (id);


--
-- Name: Section_pkey; Type: CONSTRAINT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Section"
    ADD CONSTRAINT "Section_pkey" PRIMARY KEY (id);


--
-- Name: Term_pkey; Type: CONSTRAINT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Term"
    ADD CONSTRAINT "Term_pkey" PRIMARY KEY (id);


--
-- Name: Course_department_fkey; Type: FK CONSTRAINT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Course"
    ADD CONSTRAINT "Course_department_fkey" FOREIGN KEY (department) REFERENCES "Department"(id);


--
-- Name: Section_course_id_fkey; Type: FK CONSTRAINT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Section"
    ADD CONSTRAINT "Section_course_id_fkey" FOREIGN KEY (course_id) REFERENCES "Course"(id);


--
-- Name: Section_term_id_fkey; Type: FK CONSTRAINT; Schema: Faraday; Owner: abramjstamper
--

ALTER TABLE ONLY "Section"
    ADD CONSTRAINT "Section_term_id_fkey" FOREIGN KEY (term_id) REFERENCES "Term"(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

