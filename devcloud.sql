-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-12-2018 a las 08:16:28
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos`
--

CREATE TABLE `archivos` (
  `idArchivo` int(60) NOT NULL,
  `nombreArchivo` varchar(60) NOT NULL,
  `tipoArchivo` varchar(60) NOT NULL,
  `contenidoArchivo` varchar(1000) NOT NULL,
  `idCarpeta` int(60) NOT NULL,
  `idProyecto` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `archivos`
--

INSERT INTO `archivos` (`idArchivo`, `nombreArchivo`, `tipoArchivo`, `contenidoArchivo`, `idCarpeta`, `idProyecto`) VALUES
(4, 'prueba5', 'html', 'prueba4', 9, 9),
(16, 'Nuevonombre', 'php', 'dsa\n\n', 8, 7),
(17, 'NuevoPrueba', 'php', 'Nueva orueba\n\n', 10, 7),
(19, ' Nuevo', 'php', 'No modal\n\n', 8, 7),
(20, ' Prueba', 'php', 'NM\n\n', 8, 7),
(21, ' das', 'php', 'das\n\n', 8, 7),
(22, ' dadsasfafad', 'php', 'gfsfds\n\n', 8, 7),
(23, ' dasdas', 'php', 'fdvsd\n\n', 8, 7),
(25, ' Hola', 'php', 'Hola mundo\n\n', 8, 7),
(26, ' Hola mundo html', 'html', '    <h1>Hola mundo\n\n', 8, 7),
(27, ' Hola mundo Php', 'php', '<php echo \'hola mundo\';?>\n\n', 8, 7),
(28, ' Hola mundoJS', 'javascript', 'var i = 10;\n\n', 8, 7),
(29, ' Hola mundo css', 'css', '    background-color:#000\n\n', 8, 7),
(30, ' Holamundo', 'html', '<h1>Hola mundo\n\n', 12, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carpetas`
--

CREATE TABLE `carpetas` (
  `idCarpeta` int(60) NOT NULL,
  `nombreCarpeta` varchar(60) NOT NULL,
  `idProyecto` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `carpetas`
--

INSERT INTO `carpetas` (`idCarpeta`, `nombreCarpeta`, `idProyecto`) VALUES
(8, 'Prueba23', 7),
(9, 'Prueba2233', 7),
(10, 'Prueba344', 7),
(12, 'Carpeta nueva', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colaboradores`
--

CREATE TABLE `colaboradores` (
  `idProyecto` int(11) NOT NULL,
  `idColaborador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `colaboradores`
--

INSERT INTO `colaboradores` (`idProyecto`, `idColaborador`) VALUES
(7, 33);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `idPlan` int(20) NOT NULL,
  `tipo` varchar(60) NOT NULL,
  `proyectosPlan` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `plan`
--

INSERT INTO `plan` (`idPlan`, `tipo`, `proyectosPlan`) VALUES
(1, 'Gratis', 5),
(2, 'Básico', 10),
(3, 'Avanzado', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `idProyecto` int(60) NOT NULL,
  `nombreProyecto` varchar(60) NOT NULL,
  `descripcionProyecto` varchar(100) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`idProyecto`, `nombreProyecto`, `descripcionProyecto`, `idUsuario`) VALUES
(5, 'Proyecto3', 'Prueba', 28),
(7, 'p2', 'p2', 29),
(8, 'p3', 'p3', 29),
(9, 'p4', 'p4', 29),
(10, 'p5', 'p5', 29),
(11, 'pr', 'pr', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `idPlan` int(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `correo` varchar(60) NOT NULL,
  `alias` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `idPlan`, `nombre`, `apellido`, `contrasena`, `correo`, `alias`) VALUES
(24, 1, 'Saul', 'Lainez', '15018e0af84af96f59399fe8e67c27624c244d6f', 'saullainez@hotmail.es', 'saul111'),
(26, 1, 'Alma', 'Giron', 'c1bc9539c525c041224d1e1f9ed878ed8a92601d', '', 'alma22'),
(27, 3, 'Rebeca', 'Lainez', '13589a9a0310ba532a7dbbaed863526c80de2526', 'rebeca@hotmail.com', 'rebe111'),
(28, 1, 'Ada', 'Paz', '46d3f74e1bf9ca5d46d1046b740c09354c52a89d', 'ada@gmail.es', 'apazrere'),
(29, 2, 'Morgan', 'Lainez', '50a0e990fef934e08acb2ba1237328baa98f0d8c', 'morgan@hotmail.es', 'mlainez'),
(30, 1, 'Maria', 'Lainez', '70ba5d6ce0c9554c4a8a97b95a37acd4b7d0477f', '', ''),
(31, 3, 'Roman', 'Riquelme', '57da3cb05a5fc20a9c5bec77f208b25dafd1c963', 'roman@hotmail.com', 'RR11'),
(32, 1, 'Nazareno', 'Rodriguez', '39c6451989fe7fce07ed104635986769feaad8ca', 'nazareno@hotmail.com', 'nrodri'),
(33, 3, 'Silvio', 'Rodriguez', '2768ceb33d368963a6774b652f8d27555e477c55', 'silvio@hotmail.es', 'srodri'),
(34, 3, 'Fredy', 'Lainez', '51f637b57f19e8d99e2873d1e72dc6733205f99e', 'fredy@hotmail.com', 'flainez');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD PRIMARY KEY (`idArchivo`),
  ADD KEY `idCarpeta` (`idCarpeta`),
  ADD KEY `idProyecto` (`idProyecto`);

--
-- Indices de la tabla `carpetas`
--
ALTER TABLE `carpetas`
  ADD PRIMARY KEY (`idCarpeta`),
  ADD KEY `idProyecto` (`idProyecto`);

--
-- Indices de la tabla `colaboradores`
--
ALTER TABLE `colaboradores`
  ADD KEY `idProyecto` (`idProyecto`),
  ADD KEY `idColaborador` (`idColaborador`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`idPlan`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`idProyecto`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `idPlan` (`idPlan`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivos`
--
ALTER TABLE `archivos`
  MODIFY `idArchivo` int(60) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `carpetas`
--
ALTER TABLE `carpetas`
  MODIFY `idCarpeta` int(60) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `idProyecto` int(60) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD CONSTRAINT `archivos_ibfk_1` FOREIGN KEY (`idCarpeta`) REFERENCES `carpetas` (`idCarpeta`),
  ADD CONSTRAINT `archivos_ibfk_2` FOREIGN KEY (`idProyecto`) REFERENCES `proyectos` (`idProyecto`);

--
-- Filtros para la tabla `carpetas`
--
ALTER TABLE `carpetas`
  ADD CONSTRAINT `carpetas_ibfk_1` FOREIGN KEY (`idProyecto`) REFERENCES `proyectos` (`idProyecto`);

--
-- Filtros para la tabla `colaboradores`
--
ALTER TABLE `colaboradores`
  ADD CONSTRAINT `colaboradores_ibfk_1` FOREIGN KEY (`idColaborador`) REFERENCES `usuarios` (`Id`),
  ADD CONSTRAINT `colaboradores_ibfk_2` FOREIGN KEY (`idProyecto`) REFERENCES `proyectos` (`idProyecto`);

--
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`Id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`idPlan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
