/**
 * $Id: Constants.java,v 1.6 2013/04/27 12:54:13 david Exp $
 * Copyright (c) 2010-2013, JGraph Ltd
 */
package com.mxgraph.imageexport;

import java.awt.image.BufferedImage;
import java.util.ArrayList;

/**
 * Constants for image export generation
 */
public class Constants
{
	/**
	 * Cached empty image for performance
	 */
	public static BufferedImage EMPTY_IMAGE;

	/**
	 * Initializes the empty image.
	 */
	static
	{
		try
		{
			EMPTY_IMAGE = new BufferedImage(1, 1, BufferedImage.TYPE_INT_RGB);
		}
		catch (Exception e)
		{
			// ignore
		}
	}

	/**
	 * Maximum size (in bytes) for request payloads. Default is 10485760 (10MB).
	 */
	public static final int MAX_REQUEST_SIZE = 10485760;

	/**
	 * Maximum are for exports. Default assumes the area taken by a 
	 * 10000px by 10000px image.
	 */
	public static final int MAX_AREA = 10000 * 10000;

	/**
	 * Default image domain for relative images.
	 */
	public static final String IMAGE_DOMAIN = "http://www.draw.io/";

	/**
	 * Image domains that map to our clipart
	 */
	public static final ArrayList<String> IMAGE_DOMAIN_MATCHES = new ArrayList<String>();
}
