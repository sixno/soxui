<?php

function an($n = '',$default = '')
{
	if($n !== '')
	{
		return isset($_SERVER['argv'][$n]) ? $_SERVER['argv'][$n] : $default;
	}
	else
	{
		return $_SERVER['argv'];
	}
}

function ex($str = '')
{
	if(is_string($str))
	{
		echo $str."\r\n";
	}
	else
	{
		var_dump($str);
	}
}

function msg($str = '')
{
	ex($str);

	exit;
}

function dir_files($dir)
{
	$files = array();
	$filec = scandir($dir);

	$dir = $dir == './' ? '' : $dir.'/';

	foreach($filec as $file)
	{
		if($file == '.' || $file == '..') continue;

		if(is_dir($dir.$file))
		{
			$files = array_merge($files,dir_files($dir.$file));
		}
		else
		{
			$files[] = $dir.$file;
		}
	}

	return $files;
}

chdir('src');

$files = dir_files('./');

chdir('../');

foreach($files as $file)
{
	$use_dir = 'dist/'.dirname($file);

	if(!is_dir($use_dir)) mkdir($use_dir,0777,TRUE);

	switch(pathinfo($file,PATHINFO_EXTENSION))
	{
		case 'less': continue; break;

		case 'js':
			ex('compress file [src/'.$file.'] to [dist/'.$file.']');

			exec('uglifyjs src/'.$file.' -m -o dist/'.$file);
			break;

		default:
			ex('copy file [src/'.$file.'] to [dist/'.$file.']');

			copy('src/'.$file,'dist/'.$file);
			break;
	}
}

?>