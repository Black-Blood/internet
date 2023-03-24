<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" doctype-system="about:legacy-compat"/>
	<xsl:template match="/">
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Дані про планети</title>
				<link rel="stylesheet" href="../html/style/table.css" />
			</head>
			<body>
				<div class="table-wrapper">
					<table class="table">
						<caption>Дані про планети</caption>
						<thead>
							<tr>
								<td></td>
								<th>
									Назва
								</th>
								<th>
									Зображення
								</th>
								<th>
									Маса (10<sup>24</sup>кг)
								</th>
								<th>
									Діаметр (км)
								</th>
								<th>
									Щільність (кг/м<sup>3</sup>)
								</th>
								<th>
									Сила тяжіння (м/с<sup>2</sup>)
								</th>
								<th>
									Тривалість дня (години)
								</th>
								<th>
									Відстань від Сонця (10<sup>6</sup>км)
								</th>
								<th>
									Середня температура (°C)
								</th>
								<th>
									Кількість місяців
								</th>
								<th>
									Примітки
								</th>
							</tr>
						</thead>
						<tbody>
							<xsl:for-each select="solar-system/planet-groups/group">
								<xsl:variable name="number_of_planets" select="count(planet)" />
								<xsl:variable name="group_name" select="@name" />
								<xsl:for-each select="planet">
									<tr>
										<xsl:if test="position() = 1">
											<th>
												<xsl:attribute name="rowspan">
													<xsl:value-of select="$number_of_planets"/>
												</xsl:attribute>
												<xsl:value-of select="$group_name"/>
											</th>
										</xsl:if>
										<th>
											<xsl:value-of select="@name"/>
										</th>
										<td>
											<img>
												<xsl:attribute name="src">
													<xsl:value-of select="@image"/>
												</xsl:attribute>
												<xsl:attribute name="alt">
													<xsl:value-of select="@name"/>
												</xsl:attribute>
											</img>
										</td>
										<td>
											<xsl:value-of select="@mass"/>
										</td>
										<td>
											<xsl:value-of select="@diameter"/>
										</td>
										<td>
											<xsl:value-of select="@density"/>
										</td>
										<td>
											<xsl:value-of select="@gravity"/>
										</td>
										<td>
											<xsl:value-of select="@day_length"/>
										</td>
										<td>
											<xsl:value-of select="@distanse_from_sun"/>
										</td>
										<td>
											<xsl:value-of select="@temperature"/>
										</td>
										<td>
											<xsl:value-of select="@number_of_moons"/>
										</td>
										<td>
											<xsl:value-of select="@note"/>
										</td>
									</tr>
								</xsl:for-each>
							</xsl:for-each>
						</tbody>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>