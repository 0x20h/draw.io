/**
 * $Id: mxImageTranscoder.java,v 1.1 2013/04/19 10:43:29 david Exp $
 * Copyright (c) 2010-2013, JGraph Ltd
 */
package com.mxgraph.imageexport;

import java.awt.image.BufferedImage;

import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.ImageTranscoder;

/**
 * Concrete Batik image transcoder that prepares an alpha image of the
 * same of the intended output
 */
public class mxImageTranscoder extends ImageTranscoder
{
	protected BufferedImage image = null;
	
    public BufferedImage createImage(int w, int h)
    {
        image = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        return image;
    }
    
    public void writeImage(BufferedImage img, TranscoderOutput out) {}
    
    public BufferedImage getImage()
    {
        return image;
    }
}
