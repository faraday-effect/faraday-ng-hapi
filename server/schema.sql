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
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: course; Type: TABLE; Schema: public; Owner: faraday
--

CREATE TABLE course (
    id integer NOT NULL,
    prefix character varying(255) NOT NULL,
    number character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    active boolean NOT NULL,
    department_id integer NOT NULL
);


ALTER TABLE course OWNER TO faraday;

--
-- Name: course_id_seq; Type: SEQUENCE; Schema: public; Owner: faraday
--

CREATE SEQUENCE course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE course_id_seq OWNER TO faraday;

--
-- Name: course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: faraday
--

ALTER SEQUENCE course_id_seq OWNED BY course.id;


--
-- Name: department; Type: TABLE; Schema: public; Owner: faraday
--

CREATE TABLE department (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE department OWNER TO faraday;

--
-- Name: department_id_seq; Type: SEQUENCE; Schema: public; Owner: faraday
--

CREATE SEQUENCE department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE department_id_seq OWNER TO faraday;

--
-- Name: department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: faraday
--

ALTER SEQUENCE department_id_seq OWNED BY department.id;


--
-- Name: section; Type: TABLE; Schema: public; Owner: faraday
--

CREATE TABLE section (
    id integer NOT NULL,
    course_id integer NOT NULL,
    term_id integer NOT NULL,
    reg_number character varying(255) NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE section OWNER TO faraday;

--
-- Name: section_id_seq; Type: SEQUENCE; Schema: public; Owner: faraday
--

CREATE SEQUENCE section_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE section_id_seq OWNER TO faraday;

--
-- Name: section_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: faraday
--

ALTER SEQUENCE section_id_seq OWNED BY section.id;


--
-- Name: term; Type: TABLE; Schema: public; Owner: faraday
--

CREATE TABLE term (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL
);


ALTER TABLE term OWNER TO faraday;

--
-- Name: term_id_seq; Type: SEQUENCE; Schema: public; Owner: faraday
--

CREATE SEQUENCE term_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE term_id_seq OWNER TO faraday;

--
-- Name: term_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: faraday
--

ALTER SEQUENCE term_id_seq OWNED BY term.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: faraday
--

ALTER TABLE ONLY course ALTER COLUMN id SET DEFAULT nextval('course_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: faraday
--

ALTER TABLE ONLY department ALTER COLUMN id SET DEFAULT nextval('department_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: faraday
--

ALTER TABLE ONLY section ALTER COLUMN id SET DEFAULT nextval('section_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: faraday
--

ALTER TABLE ONLY term ALTER COLUMN id SET DEFAULT nextval('term_id_seq'::regclass);


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: faraday
--

COPY course (id, prefix, number, title, active, department_id) FROM stdin;
1	COS	121	Foundations of Computer Science	t	1
2	COS	243	Multi-Tier Web Applications	f	1
\.


--
-- Name: course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faraday
--

SELECT pg_catalog.setval('course_id_seq', 1, true);


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: faraday
--

COPY department (id, name) FROM stdin;
1	Computer Science
\.


--
-- Name: department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faraday
--

SELECT pg_catalog.setval('department_id_seq', 1, false);


--
-- Data for Name: section; Type: TABLE DATA; Schema: public; Owner: faraday
--

COPY section (id, course_id, term_id, reg_number, title) FROM stdin;
1	1	1	343734	Class 1
2	2	1	540723	Class 1
3	1	1	354161	Class 2
\.


--
-- Name: section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faraday
--

SELECT pg_catalog.setval('section_id_seq', 1, false);


--
-- Data for Name: term; Type: TABLE DATA; Schema: public; Owner: faraday
--

COPY term (id, name, start_date, end_date) FROM stdin;
1	Spring 2016	2016-01-01	2016-05-01
\.


--
-- Name: term_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faraday
--

SELECT pg_catalog.setval('term_id_seq', 1, false);


--
-- Name: course_pkey; Type: CONSTRAINT; Schema: public; Owner: faraday
--

ALTER TABLE ONLY course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);


--
-- Name: department_pkey; Type: CONSTRAINT; Schema: public; Owner: faraday
--

ALTER TABLE ONLY department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);


--
-- Name: section_pkey; Type: CONSTRAINT; Schema: public; Owner: faraday
--

ALTER TABLE ONLY section
    ADD CONSTRAINT section_pkey PRIMARY KEY (id);


--
-- Name: term_pkey; Type: CONSTRAINT; Schema: public; Owner: faraday
--

ALTER TABLE ONLY term
    ADD CONSTRAINT term_pkey PRIMARY KEY (id);


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

