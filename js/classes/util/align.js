class Align
{
	static scaleToGameW(obj, per)
	{
		obj.displayWidth=game.config.width*per;
		obj.scaleY=obj.scaleX;
	}
	// centrelize horizontal + vertical
	static center(obj)
	{
		obj.x=game.config.width / 2;
		obj.y=game.config.height / 2;
	}
	// centrelize horizontal
	static centerH(obj)
	{
		obj.x=game.config.width / 2;
	}
	// centrelize vertical
	static centerV(obj)
	{
		obj.x=game.config.width / 2;
	}
}