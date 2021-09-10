<nav class="navbar navbar-default navbar-inverse">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand">Kladionica</a>
		</div>
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li><a href="index.php">Kladjenje <span class="sr-only">(current)</span></a></li>
				<li><a href="tiketi.php">Tiketi</a></li>
				<li><a href="utakmice.php">Utakmice</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span id="username"></span> <span class="caret"></span></a>
					<ul class="dropdown-menu" id="right-navbar-drop">
						<li><a href="profil.php"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Profil</a></li>
						<li role="separator" class="divider"></li>
						<li style="cursor: pointer;"><a onclick="logout();"><span class="glyphicon glyphicon-eject" aria-hidden="true"></span> Logout</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</nav>