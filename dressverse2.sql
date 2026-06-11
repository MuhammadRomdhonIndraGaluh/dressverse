-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Jun 2026 pada 12.22
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dressverse2`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id_user` int(11) NOT NULL,
  `hak_kelola_user` tinyint(1) DEFAULT NULL,
  `hak_validasi_karya` tinyint(1) DEFAULT NULL,
  `hak_validasi_event` tinyint(1) DEFAULT NULL,
  `hak_kelola_sistem` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `desainer`
--

CREATE TABLE `desainer` (
  `id_desainer` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `followers` int(100) NOT NULL,
  `following` int(100) NOT NULL,
  `likes` int(100) NOT NULL,
  `bio` text NOT NULL,
  `foto_profile` varchar(100) NOT NULL,
  `instagram` varchar(50) NOT NULL,
  `kontak` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `desainer`
--

INSERT INTO `desainer` (`id_desainer`, `username`, `nickname`, `followers`, `following`, `likes`, `bio`, `foto_profile`, `instagram`, `kontak`) VALUES
(3, 'sitiaura', 'Siti Aura', 56101, 1, 81400, 'Modern fashion designer', 'aura.png', '@sitiaura', '085xxxxxxxx'),
(6, 'naylaameliazahra', 'NaellTzy', 177801, 1, 451900, 'Experienced fashion designer with a strong passion for style and detail. Skilled in conceptualizing, designing, and producing fashion pieces for various occasions, from runway collections to commercial projects.', 'nayla.jpg', '@naelltzy', 'naylaameliazahra@gmail.com'),
(7, 'sitiannazwa', 'Siti Annazwa', 76101, 1, 98700, 'Fashion designer with elegant style', 'siti.jpg', '@annazwa', '0897xxxxxxx'),
(8, 'tyasshh', 'Tyasshh', 119805, 1, 356700, 'Fashion designer specializing in elegant and luxurious designs.', 'tyas.jpg', '@tyash', 'tyas@gmail.com'),
(9, 'ayumutia', 'Ayu Mutia', 59301, 1, 85700, 'Creative fashion designer', 'ayu.jpg', '@ayumutia', '080987654321');

-- --------------------------------------------------------

--
-- Struktur dari tabel `event`
--

CREATE TABLE `event` (
  `id_event` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `nama_event` varchar(70) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `waktu_mulai` time DEFAULT NULL,
  `waktu_selesai` time DEFAULT NULL,
  `lokasi` varchar(150) DEFAULT NULL,
  `gambar` varchar(150) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `event`
--

INSERT INTO `event` (`id_event`, `id_user`, `nama_event`, `deskripsi`, `tanggal`, `waktu_mulai`, `waktu_selesai`, `lokasi`, `gambar`, `status`) VALUES
(4, 7, 'The Grand Couture Show', 'Experience the elegance of fashion, luxury designers, modern runway, and unforgettable glamour only at DressVerse.', '2027-06-27', '16:00:00', '21:00:00', 'Jakarta Convention Center', 'bannerevent.png', 'active'),
(5, 7, 'Elite Model Casting', 'Join the biggest model casting event and get a chance to become the next DressVerse runway model.', '2027-06-28', '16:00:00', '21:00:00', 'Jakarta Convention Center', 'event1.png', 'active');

-- --------------------------------------------------------

--
-- Struktur dari tabel `event_organizer`
--

CREATE TABLE `event_organizer` (
  `id_user` int(11) NOT NULL,
  `hak_upload_event` tinyint(1) DEFAULT 0,
  `hak_kelola_event` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `gallery_karya`
--

CREATE TABLE `gallery_karya` (
  `id_karya` int(11) NOT NULL,
  `id_desainer` int(11) DEFAULT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `foto_karya` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `tanggal_upload` date DEFAULT NULL,
  `jumlah_likes` int(11) DEFAULT NULL,
  `jumlah_komentar` int(11) DEFAULT NULL,
  `kategori` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `gallery_karya`
--

INSERT INTO `gallery_karya` (`id_karya`, `id_desainer`, `judul`, `foto_karya`, `deskripsi`, `tanggal_upload`, `jumlah_likes`, `jumlah_komentar`, `kategori`) VALUES
(19, 8, 'Elegance Noir Dress', 'Rectangle 51.png', 'Sophisticated Victorian-inspired fashion piece.', '2027-01-01', 356700, 1200, 'Skirts'),
(20, 8, 'Crimson Lace Pants', 'Rectangle 56.png', 'Unique lace fashion pants with luxury details.', '2027-01-01', 356700, 850, 'Pants'),
(21, 6, 'Blush Royal Dress', 'bajuhome2.png', 'Elegant pink royal-inspired dress.', '2027-01-01', 356700, 920, 'Dresses'),
(22, 8, 'Desert Runway Couture', 'Rectangle 70.png', 'Runway couture inspired by natural textures.', '2027-01-01', 356700, 780, 'Other'),
(23, 8, 'White Swan Dress', 'Rectangle 72.png', 'Graceful white dress with modern silhouette.', '2027-01-01', 356700, 1100, 'Dresses'),
(24, 6, 'Pink Princess Couture', 'bajuhome3.png', 'Luxury princess-style couture design.', '2027-01-01', 356700, 970, 'Dresses'),
(25, 7, 'Midnight Eclipse Vest', 'shirt.png', 'Sophisticated formalwear inspired by celestial elegance and modern luxury. Featuring intricate crystal embellishments arranged in a radiant starburst pattern, paired with sleek satin accents and a refined tailored silhouette. Designed for runway appearances, gala events, and high-fashion editorial concepts.', '2026-06-01', 1209, 20, 'T-Shirts'),
(26, 7, 'Stellar Gentleman', 'shirt2.png', 'just elegant Shirt for styling.', '2026-05-05', 100000, 20, 'T-Shirts'),
(27, 3, 'Elegant Blues Dress', 'dresses.png', 'Hope someone wearing this..', '2026-02-17', 81400, 3001, 'dresses'),
(28, 9, 'Simply Blues Crop Jacket', 'jacket.avif', 'On sale at my Shopee account', '2026-03-04', 35700, 201, 'Jackets'),
(29, 9, 'Sakura\'s Outer Jackets', 'jacket2.jpg', 'On sale at my Shopee account', '2027-01-01', 1209, 12, 'Jackets');

-- --------------------------------------------------------

--
-- Struktur dari tabel `login`
--

CREATE TABLE `login` (
  `id_login` int(11) NOT NULL,
  `waktu_login` datetime DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pendaftaran_model`
--

CREATE TABLE `pendaftaran_model` (
  `id_pendaftaran` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_karya` int(11) DEFAULT NULL,
  `id_event` int(11) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `kontak` varchar(100) DEFAULT NULL,
  `portof` varchar(100) DEFAULT NULL,
  `tanggal_daftar` date DEFAULT NULL,
  `foto` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pendaftaran_model`
--

INSERT INTO `pendaftaran_model` (`id_pendaftaran`, `id_user`, `id_karya`, `id_event`, `nama`, `kontak`, `portof`, `tanggal_daftar`, `foto`) VALUES
(7, 5, 19, NULL, 'Mutia', '081234567890', 'https://portfolio-mutia.com', '2026-05-31', 'mutia.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `project_model`
--

CREATE TABLE `project_model` (
  `id_project` int(11) NOT NULL,
  `nama_project` varchar(100) DEFAULT NULL,
  `kategori` varchar(100) DEFAULT NULL,
  `lokasi` varchar(100) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar` varchar(150) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `project_model`
--

INSERT INTO `project_model` (`id_project`, `nama_project`, `kategori`, `lokasi`, `deadline`, `deskripsi`, `gambar`, `status`) VALUES
(1, 'Annazwa', 'Hand, Fingers', 'Bandung', '2027-03-21', 'Female hand model for jewelry and accessories photoshoot.', 'Rectangle 97 (1).png', 'Aktif'),
(2, 'Luxe', 'Face Model', 'Jakarta', '2027-04-11', 'Face model for luxury beauty campaign.', 'Rectangle 97 (2).png', 'Aktif'),
(3, 'Veloura', 'Fashion Runway', 'Bali', '2027-05-09', 'Runway model for fashion event.', 'Rectangle 97 (3).png', 'Aktif'),
(4, 'Elvare', 'Editorial', 'Surabaya', '2027-06-15', 'Editorial photoshoot project.', 'Rectangle 97 (4).png', 'Aktif'),
(5, 'Celestia', 'Jewelry', 'Yogyakarta', '2027-07-22', 'Jewelry photoshoot campaign.', 'Rectangle 97 (5).png', 'Aktif'),
(6, 'Morvelle', 'Luxury Fashion', 'Bandung', '2027-08-30', 'Luxury fashion catalog photoshoot.', 'Rectangle 97 (4).png', 'Aktif');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `nama`, `email`, `password`, `role`) VALUES
(3, 'Siti Aura', 'aura@gmail.com', 'b', 'designer'),
(5, 'Mutia', 'mutia@gmail.com', '1111', 'user'),
(6, 'Nael', 'nael@gmail.com', '2222', 'designer'),
(7, 'Annazwa', 'annazwa@gmail.com', '3333', 'event_orga'),
(8, 'Tyasshh', 'tyasshh@gmail.com', '1234', 'designer'),
(9, 'Ayu Mutia', 'ayu@gmail.com', '1234', 'designer');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `desainer`
--
ALTER TABLE `desainer`
  ADD PRIMARY KEY (`id_desainer`);

--
-- Indeks untuk tabel `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id_event`),
  ADD KEY `fk_event_user` (`id_user`);

--
-- Indeks untuk tabel `event_organizer`
--
ALTER TABLE `event_organizer`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `gallery_karya`
--
ALTER TABLE `gallery_karya`
  ADD PRIMARY KEY (`id_karya`),
  ADD KEY `id_user` (`id_desainer`);

--
-- Indeks untuk tabel `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`),
  ADD KEY `fk_login_user` (`id_user`);

--
-- Indeks untuk tabel `pendaftaran_model`
--
ALTER TABLE `pendaftaran_model`
  ADD PRIMARY KEY (`id_pendaftaran`),
  ADD KEY `fk_pendaftaran_user` (`id_user`),
  ADD KEY `fk_pendaftaran_event` (`id_event`),
  ADD KEY `fk_pendaftaran_karya` (`id_karya`);

--
-- Indeks untuk tabel `project_model`
--
ALTER TABLE `project_model`
  ADD PRIMARY KEY (`id_project`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `desainer`
--
ALTER TABLE `desainer`
  MODIFY `id_desainer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `event`
--
ALTER TABLE `event`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `gallery_karya`
--
ALTER TABLE `gallery_karya`
  MODIFY `id_karya` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT untuk tabel `pendaftaran_model`
--
ALTER TABLE `pendaftaran_model`
  MODIFY `id_pendaftaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `project_model`
--
ALTER TABLE `project_model`
  MODIFY `id_project` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `desainer`
--
ALTER TABLE `desainer`
  ADD CONSTRAINT `desainer_ibfk_1` FOREIGN KEY (`id_desainer`) REFERENCES `users` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_event_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `event_organizer`
--
ALTER TABLE `event_organizer`
  ADD CONSTRAINT `fk_event_organizer_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `gallery_karya`
--
ALTER TABLE `gallery_karya`
  ADD CONSTRAINT `gallery_karya_ibfk_1` FOREIGN KEY (`id_desainer`) REFERENCES `users` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `fk_login_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `pendaftaran_model`
--
ALTER TABLE `pendaftaran_model`
  ADD CONSTRAINT `fk_pendaftaran_event` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`),
  ADD CONSTRAINT `fk_pendaftaran_karya` FOREIGN KEY (`id_karya`) REFERENCES `gallery_karya` (`id_karya`),
  ADD CONSTRAINT `fk_pendaftaran_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
