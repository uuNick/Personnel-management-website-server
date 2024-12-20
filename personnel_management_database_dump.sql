PGDMP      6                |            Personnel_management_database    17.2    17.2 L    L           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            M           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            N           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            O           1262    20626    Personnel_management_database    DATABASE     �   CREATE DATABASE "Personnel_management_database" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
 /   DROP DATABASE "Personnel_management_database";
                     postgres    false            �            1259    20688    DataChanges    TABLE     ;  CREATE TABLE public."DataChanges" (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    user_id integer NOT NULL,
    data_of_change date NOT NULL,
    type_of_change character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."DataChanges";
       public         heap r       postgres    false            �            1259    20687    DataChanges_id_seq    SEQUENCE     �   CREATE SEQUENCE public."DataChanges_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."DataChanges_id_seq";
       public               postgres    false    227            P           0    0    DataChanges_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."DataChanges_id_seq" OWNED BY public."DataChanges".id;
          public               postgres    false    226            �            1259    20705    DayOffs    TABLE     �   CREATE TABLE public."DayOffs" (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    reason text
);
    DROP TABLE public."DayOffs";
       public         heap r       postgres    false            �            1259    20704    DayOffs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."DayOffs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."DayOffs_id_seq";
       public               postgres    false    229            Q           0    0    DayOffs_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."DayOffs_id_seq" OWNED BY public."DayOffs".id;
          public               postgres    false    228            �            1259    20674 	   Documents    TABLE     �   CREATE TABLE public."Documents" (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    document_type character varying(50) NOT NULL,
    upload_date date NOT NULL,
    file_name character varying(50) NOT NULL,
    notes text
);
    DROP TABLE public."Documents";
       public         heap r       postgres    false            �            1259    20673    Documents_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Documents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Documents_id_seq";
       public               postgres    false    225            R           0    0    Documents_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Documents_id_seq" OWNED BY public."Documents".id;
          public               postgres    false    224            �            1259    20665 	   Employees    TABLE     }  CREATE TABLE public."Employees" (
    id integer NOT NULL,
    fullname character varying(255) NOT NULL,
    birth_date date NOT NULL,
    "position" character varying(255) NOT NULL,
    start_date date NOT NULL,
    phone_number character varying(20) NOT NULL,
    email character varying(255),
    address character varying(255) NOT NULL,
    image_name character varying(50)
);
    DROP TABLE public."Employees";
       public         heap r       postgres    false            �            1259    20664    Employees_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Employees_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Employees_id_seq";
       public               postgres    false    223            S           0    0    Employees_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Employees_id_seq" OWNED BY public."Employees".id;
          public               postgres    false    222            �            1259    20641    Role    TABLE     �   CREATE TABLE public."Role" (
    id integer NOT NULL,
    "roleName" character varying(50) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Role";
       public         heap r       postgres    false            �            1259    20640    Role_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Role_id_seq";
       public               postgres    false    220            T           0    0    Role_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;
          public               postgres    false    219            �            1259    20736 
   SickLeaves    TABLE     �   CREATE TABLE public."SickLeaves" (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    document_id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    diagnosis text
);
     DROP TABLE public."SickLeaves";
       public         heap r       postgres    false            �            1259    20735    SickLeaves_id_seq    SEQUENCE     �   CREATE SEQUENCE public."SickLeaves_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."SickLeaves_id_seq";
       public               postgres    false    233            U           0    0    SickLeaves_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."SickLeaves_id_seq" OWNED BY public."SickLeaves".id;
          public               postgres    false    232            �            1259    20649    UserRole    TABLE     a   CREATE TABLE public."UserRole" (
    "userId" integer NOT NULL,
    "roleId" integer NOT NULL
);
    DROP TABLE public."UserRole";
       public         heap r       postgres    false            �            1259    20628    Users    TABLE     %  CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap r       postgres    false            �            1259    20627    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public               postgres    false    218            V           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public               postgres    false    217            �            1259    20719 	   Vacations    TABLE     �   CREATE TABLE public."Vacations" (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    document_id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    type character varying(50) NOT NULL
);
    DROP TABLE public."Vacations";
       public         heap r       postgres    false            �            1259    20718    Vacations_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Vacations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Vacations_id_seq";
       public               postgres    false    231            W           0    0    Vacations_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Vacations_id_seq" OWNED BY public."Vacations".id;
          public               postgres    false    230            �           2604    20691    DataChanges id    DEFAULT     t   ALTER TABLE ONLY public."DataChanges" ALTER COLUMN id SET DEFAULT nextval('public."DataChanges_id_seq"'::regclass);
 ?   ALTER TABLE public."DataChanges" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    227    227            �           2604    20708 
   DayOffs id    DEFAULT     l   ALTER TABLE ONLY public."DayOffs" ALTER COLUMN id SET DEFAULT nextval('public."DayOffs_id_seq"'::regclass);
 ;   ALTER TABLE public."DayOffs" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    228    229    229            �           2604    20677    Documents id    DEFAULT     p   ALTER TABLE ONLY public."Documents" ALTER COLUMN id SET DEFAULT nextval('public."Documents_id_seq"'::regclass);
 =   ALTER TABLE public."Documents" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    225    225            �           2604    20668    Employees id    DEFAULT     p   ALTER TABLE ONLY public."Employees" ALTER COLUMN id SET DEFAULT nextval('public."Employees_id_seq"'::regclass);
 =   ALTER TABLE public."Employees" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    222    223                       2604    20644    Role id    DEFAULT     f   ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);
 8   ALTER TABLE public."Role" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            �           2604    20739    SickLeaves id    DEFAULT     r   ALTER TABLE ONLY public."SickLeaves" ALTER COLUMN id SET DEFAULT nextval('public."SickLeaves_id_seq"'::regclass);
 >   ALTER TABLE public."SickLeaves" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    233    232    233            ~           2604    20631    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �           2604    20722    Vacations id    DEFAULT     p   ALTER TABLE ONLY public."Vacations" ALTER COLUMN id SET DEFAULT nextval('public."Vacations_id_seq"'::regclass);
 =   ALTER TABLE public."Vacations" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    230    231    231            C          0    20688    DataChanges 
   TABLE DATA           {   COPY public."DataChanges" (id, employee_id, user_id, data_of_change, type_of_change, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    227   �]       E          0    20705    DayOffs 
   TABLE DATA           R   COPY public."DayOffs" (id, employee_id, start_date, end_date, reason) FROM stdin;
    public               postgres    false    229   �]       A          0    20674 	   Documents 
   TABLE DATA           d   COPY public."Documents" (id, employee_id, document_type, upload_date, file_name, notes) FROM stdin;
    public               postgres    false    225   +_       ?          0    20665 	   Employees 
   TABLE DATA           �   COPY public."Employees" (id, fullname, birth_date, "position", start_date, phone_number, email, address, image_name) FROM stdin;
    public               postgres    false    223   ;b       <          0    20641    Role 
   TABLE DATA           J   COPY public."Role" (id, "roleName", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    220   �f       I          0    20736 
   SickLeaves 
   TABLE DATA           e   COPY public."SickLeaves" (id, employee_id, document_id, start_date, end_date, diagnosis) FROM stdin;
    public               postgres    false    233   9g       =          0    20649    UserRole 
   TABLE DATA           8   COPY public."UserRole" ("userId", "roleId") FROM stdin;
    public               postgres    false    221   nh       :          0    20628    Users 
   TABLE DATA           Z   COPY public."Users" (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    218   �h       G          0    20719 	   Vacations 
   TABLE DATA           _   COPY public."Vacations" (id, employee_id, document_id, start_date, end_date, type) FROM stdin;
    public               postgres    false    231   vi       X           0    0    DataChanges_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."DataChanges_id_seq"', 1, false);
          public               postgres    false    226            Y           0    0    DayOffs_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."DayOffs_id_seq"', 27, true);
          public               postgres    false    228            Z           0    0    Documents_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Documents_id_seq"', 38, true);
          public               postgres    false    224            [           0    0    Employees_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Employees_id_seq"', 16, true);
          public               postgres    false    222            \           0    0    Role_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Role_id_seq"', 2, true);
          public               postgres    false    219            ]           0    0    SickLeaves_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."SickLeaves_id_seq"', 17, true);
          public               postgres    false    232            ^           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);
          public               postgres    false    217            _           0    0    Vacations_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Vacations_id_seq"', 19, true);
          public               postgres    false    230            �           2606    20693    DataChanges DataChanges_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."DataChanges"
    ADD CONSTRAINT "DataChanges_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."DataChanges" DROP CONSTRAINT "DataChanges_pkey";
       public                 postgres    false    227            �           2606    20712    DayOffs DayOffs_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."DayOffs"
    ADD CONSTRAINT "DayOffs_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."DayOffs" DROP CONSTRAINT "DayOffs_pkey";
       public                 postgres    false    229            �           2606    20681    Documents Documents_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Documents" DROP CONSTRAINT "Documents_pkey";
       public                 postgres    false    225            �           2606    20672    Employees Employees_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "Employees_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Employees" DROP CONSTRAINT "Employees_pkey";
       public                 postgres    false    223            �           2606    20646    Role Role_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_pkey";
       public                 postgres    false    220            �           2606    20648    Role Role_roleName_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_roleName_key" UNIQUE ("roleName");
 D   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_roleName_key";
       public                 postgres    false    220            �           2606    20743    SickLeaves SickLeaves_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."SickLeaves"
    ADD CONSTRAINT "SickLeaves_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."SickLeaves" DROP CONSTRAINT "SickLeaves_pkey";
       public                 postgres    false    233            �           2606    20653    UserRole UserRole_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId", "roleId");
 D   ALTER TABLE ONLY public."UserRole" DROP CONSTRAINT "UserRole_pkey";
       public                 postgres    false    221    221            �           2606    20639    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public                 postgres    false    218            �           2606    20635    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public                 postgres    false    218            �           2606    20637    Users Users_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);
 F   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_username_key";
       public                 postgres    false    218            �           2606    20724    Vacations Vacations_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Vacations"
    ADD CONSTRAINT "Vacations_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Vacations" DROP CONSTRAINT "Vacations_pkey";
       public                 postgres    false    231            �           2606    20694 (   DataChanges DataChanges_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DataChanges"
    ADD CONSTRAINT "DataChanges_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."Employees"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public."DataChanges" DROP CONSTRAINT "DataChanges_employee_id_fkey";
       public               postgres    false    227    4755    223            �           2606    20699 $   DataChanges DataChanges_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DataChanges"
    ADD CONSTRAINT "DataChanges_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."DataChanges" DROP CONSTRAINT "DataChanges_user_id_fkey";
       public               postgres    false    227    218    4745            �           2606    20713     DayOffs DayOffs_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DayOffs"
    ADD CONSTRAINT "DayOffs_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."Employees"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."DayOffs" DROP CONSTRAINT "DayOffs_employee_id_fkey";
       public               postgres    false    4755    229    223            �           2606    20682 $   Documents Documents_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."Employees"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."Documents" DROP CONSTRAINT "Documents_employee_id_fkey";
       public               postgres    false    4755    225    223            �           2606    20749 &   SickLeaves SickLeaves_document_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."SickLeaves"
    ADD CONSTRAINT "SickLeaves_document_id_fkey" FOREIGN KEY (document_id) REFERENCES public."Documents"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."SickLeaves" DROP CONSTRAINT "SickLeaves_document_id_fkey";
       public               postgres    false    233    225    4757            �           2606    20744 &   SickLeaves SickLeaves_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."SickLeaves"
    ADD CONSTRAINT "SickLeaves_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."Employees"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."SickLeaves" DROP CONSTRAINT "SickLeaves_employee_id_fkey";
       public               postgres    false    223    4755    233            �           2606    20659    UserRole UserRole_roleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";
       public               postgres    false    4749    220    221            �           2606    20654    UserRole UserRole_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."UserRole" DROP CONSTRAINT "UserRole_userId_fkey";
       public               postgres    false    218    4745    221            �           2606    20730 $   Vacations Vacations_document_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Vacations"
    ADD CONSTRAINT "Vacations_document_id_fkey" FOREIGN KEY (document_id) REFERENCES public."Documents"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."Vacations" DROP CONSTRAINT "Vacations_document_id_fkey";
       public               postgres    false    231    225    4757            �           2606    20725 $   Vacations Vacations_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Vacations"
    ADD CONSTRAINT "Vacations_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."Employees"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."Vacations" DROP CONSTRAINT "Vacations_employee_id_fkey";
       public               postgres    false    223    231    4755            C      x������ � �      E   i  x��T[N�@�vN�,���l��a(�H.�hE��r�p��:(A��h5iggvl�T�3u44����EZ��9�)����3��2��9=�����S���w>VT��Z�~M�� �?z�me�.�[C��v�����+r(2
�� �Fc��(H(TRg��Eh��'ާ�l��]w��t'^��}Հ��t�q�3�� �yI[��ZCNa;KG�V6(�_��h��
ü HE�i7����Z.^7u8�u��U�p�==Ŀ7���MR�5T#nm	R���y��P^]��8Uж��y���RC��L���p�.m���yC�p�^3���L��+�3CX(�U0N.B�B���~��ȷ7UU� bs��      A      x���ͭ�6��b� ���Ӏ��2 ������0\�[��Fb;~iA�(W�lF�A	��·��sq�a|;>�_�?Ư�_��������2~�//�ǁ��#u���z��//::x
�[t#EV��?�2~��7����4=Nӫ������}M^j�a�X?z����7_�������\����p�Fw�
2w7 :����V��L�x8;��]�aw�j���SӁ���=9$;�&��ηu�A6�C.���������e�{؉��ND8��\tj1�n�8'0����1���z[������3:0/��{��m�L��C\�H/�-|�ӷV���J�X����pv_���kP�x7� R���c�CP@�=�D���^�W��}��s���[M~�A�)S�RO������,�W6̔;j'��f��0�>��w�z�9�9/���g��L��_>�� vW���?��{��#�/�����<���<���sx�H�+b
�U]��#O̍`�]����O�"�̥�����Ĳ����V9ż�d��	%�F4���2fל3Vd%��=x<�5�9��t
��Ӯ�h�pB���́dc�yE�f���:O�tn�{�K��i�R��`n٨�l�E��))�s��K"'thT=os�[���32��	RFln�{kf�0���i 5��w����,L�-�n�('0sc�����V�G�TQ��q�4�k��L�^-��.�j�	��~x�Z��(�      ?   �  x�}UMo�F<��1��.���pP�ݠ�K.DB��%ѐT!��q`�E�A{(Risi��㴲;a��:lG�PEΛ���^*�z��h�N���rԩ�D��2�&VR�W�A�
oq=	��?��ՇBI�'�85��S�3c��Ÿ��E�����G���~.��i8���K����=���Y����ȉn��q��ƸܤR�{�m��:+J����h���(V��H���T��+��>j��S�/R����,WR{�����nP%�I^�+fwQ� ҫ���t��bo��Y&3��f��=�T�jm��NYNprz��@/�j�H2���ґ�2��4U�w�N�dw�W�>��}8�`���f��2����3:WVf�fb������T�"Z���O���6��P^��i���eA��R�^_�n:ͦ��8�>��ߔ�<$�;{gA/VH��m��h�W�`T��,��9h�S��O�u.�C �H?h��`�4�X�������L�%g������Y���R11+6�1(}2�p��l���l�[k�m��k�)؎#*O!�Y�k?fw��+�!��]ksi���v7�1��tR"�T�&p����5�l���. �.��/���^�T:�S�G[+�BF��͒����X����P�ͲV�	!�mnեD�(�+j*�n��h��y) �2���r
��'T��#�HFĲþ���.(��#���6��%ɤѣ��Jsg� @2i ��}U?���ب�GNS��8s�;l=��>V��A}ą��hz5у�ÚGU��'���e^��k���p�i6��A��ᷫ��מ޳��d��� 9�vA��v��T�QL2ja�Q�����1�SH����Wv��o���FǓ���&ڐ�=Z{>y�\6?Q��Hn�F�!��D�d��_��/��h
Ϥ2^���F��kHII4��k3~�
\��
�v�5v��[ #���a�!-)Я�����_9���9N�\�6���Z\zσ!�b{R�{�{XL�i�q8`�NH�vf�y�Z4�R.F-L������cvj
�߅����"���FM���*�Eccݷߒr��-p8����m��W�$�&
�N%x�sd�dX�NY�d�-��ֲ2������ 
q�      <   [   x�3�0���/̿0�¬�.̻������D��H��\��������H���L������waO�h��k�40F��� rv3W      I   %  x�]R[J1�NN�"�$3�\��aDT�aO0���W�������eS�՝�!E��u�X24T���|�[>�A;-\2��A�d���w��7�C���!}�9?����K��X!j�~�~�{�>��e���<s�9.섻B�ju�#������&4KK��N�2���7jйޅ,F��Ć6vK��Q���L�i��7���"��M~�X@RuGqu�GR�����'E���"¢e� �����	c�`�2���t���oI�����Rk�����      =      x�3�4�2�4����� ��      :   �   x���;o�0�����!��Qp˄ @h��6�2���!&$N��4��R'���+�塈�\[����:�'U�f�/�>�����#���� �}�M�Ţ�Ll:?��a�8�x���O��B@�M�M���v00h���h^֕��9!�[V���z����xMw��K��Ϥ�U�p�O�'�d���on�\�I�Eg����-v��V�      G   �   x���KjAD�5wi�R��.�O���`r�F�3��ZhQ��UAp���DI½�;۷���|��}�ž����ۢP��Je�)o#*#��0��bH���TG[������P���a7hI��X^S+<�<�:��Ы�_/�[�bLm� �0�ӫ�^چ8O.ǜ�+�}�ܙ�;�������)s�k���x���TX��e���n�-�*�2���vZ����X     