<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" doctype-system="about:legacy-compat"/>
	<xsl:template match="/">
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Паспортні дані</title>
				<link rel="stylesheet" href="../html/style/table.css" />
			</head>
			<body>
				<div class="table-wrapper">
					<table class="table">
						<caption>Паспортні дані</caption>
						<thead>
							<tr>
								<th style="min-width: 100px;">
									ID
								</th>
								<th style="min-width: 160px;">
									Зображення
								</th>
								<th style="min-width: 250px;">
									Повне ім'я
								</th>
								<th style="min-width: 150px;">
									Дата народження
								</th>
								<th style="min-width: 300px; width: 100%;">
									Адреса
								</th>
							</tr>
						</thead>
						<tbody>
							<xsl:for-each select="passports/passport">
								<tr>
									<td>
										<xsl:value-of select="@id"/>
									</td>
									<td>
										<img>
											<xsl:attribute name="src">
												<xsl:value-of select="photo/@path"/>
											</xsl:attribute>
										</img>
									</td>
									<td>
										<xsl:value-of select="fullname/@lastname"/><span>&#160;</span>
										<xsl:value-of select="fullname/@firstname"/><span>&#160;</span>
										<xsl:value-of select="fullname/@fathername"/> 
									</td>
									<td>
										<xsl:value-of select="birthday/@year"/><span>-</span>
										<xsl:value-of select="birthday/@month"/><span>-</span>
										<xsl:value-of select="birthday/@day"/>
									</td>
									<td>
										<xsl:value-of select="address/@city"/>, 
										<xsl:value-of select="address/@street"/>
									</td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>